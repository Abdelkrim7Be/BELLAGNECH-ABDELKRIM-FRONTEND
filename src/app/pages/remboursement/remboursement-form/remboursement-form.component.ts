import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RemboursementService } from '../../../services/remboursement.service';
import { CreditService } from '../../../services/credit.service';
import { Remboursement } from '../../../models/remboursement.model';
import { Credit } from '../../../models/credit.model';
import { StatutRemboursement } from '../../../models/statut-remboursement.enum';

@Component({
  selector: 'app-remboursement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './remboursement-form.component.html',
  styleUrl: './remboursement-form.component.scss'
})
export class RemboursementFormComponent implements OnInit {
  remboursementForm!: FormGroup;
  remboursementId?: number;
  creditId?: number;
  isEditMode = false;
  loading = false;
  error: string | null = null;
  submitted = false;
  
  credits: Credit[] = [];
  statutOptions = Object.values(StatutRemboursement);

  constructor(
    private fb: FormBuilder,
    private remboursementService: RemboursementService,
    private creditService: CreditService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if we're in edit mode
    this.remboursementId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !isNaN(this.remboursementId) && this.remboursementId > 0;
    
    // Check if we have a credit ID from the route
    this.creditId = Number(this.route.snapshot.paramMap.get('creditId'));
    
    this.initForm();
    this.loadCredits();
    
    if (this.isEditMode) {
      this.loadRemboursement(this.remboursementId!);
    }
  }

  initForm(): void {
    this.remboursementForm = this.fb.group({
      creditId: [this.creditId || '', [Validators.required]],
      montant: ['', [Validators.required, Validators.min(0.01)]],
      dateEcheance: ['', [Validators.required]],
      datePaiement: [''],
      montantPenalite: [0],
      statut: [StatutRemboursement.A_PAYER, [Validators.required]],
      numeroEcheance: ['', [Validators.required, Validators.min(1)]],
      commentaire: ['']
    });
  }

  loadCredits(): void {
    this.creditService.getAll().subscribe({
      next: (credits) => {
        this.credits = credits;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des crédits: ' + err.message;
      }
    });
  }

  loadRemboursement(id: number): void {
    this.loading = true;
    this.remboursementService.getById(id).subscribe({
      next: (remboursement) => {
        // Format dates for input fields
        if (remboursement.dateEcheance && typeof remboursement.dateEcheance === 'string') {
          remboursement.dateEcheance = remboursement.dateEcheance.split('T')[0];
        }
        if (remboursement.datePaiement && typeof remboursement.datePaiement === 'string') {
          remboursement.datePaiement = remboursement.datePaiement.split('T')[0];
        }
        
        this.remboursementForm.patchValue(remboursement);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du remboursement: ' + err.message;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.remboursementForm.invalid) {
      return;
    }
    
    this.loading = true;
    const remboursementData: Remboursement = this.remboursementForm.value;
    
    if (this.isEditMode) {
      remboursementData.id = this.remboursementId;
      this.remboursementService.update(remboursementData).subscribe({
        next: () => {
          this.navigateAfterSave();
        },
        error: (err) => {
          this.error = 'Erreur lors de la mise à jour du remboursement: ' + err.message;
          this.loading = false;
        }
      });
    } else {
      this.remboursementService.add(remboursementData).subscribe({
        next: () => {
          this.navigateAfterSave();
        },
        error: (err) => {
          this.error = 'Erreur lors de l\'ajout du remboursement: ' + err.message;
          this.loading = false;
        }
      });
    }
  }

  navigateAfterSave(): void {
    if (this.creditId) {
      this.router.navigate(['/credits', this.creditId, 'remboursements']);
    } else {
      this.router.navigate(['/remboursements']);
    }
  }

  // Helper method to check if a field is invalid and touched
  isInvalid(fieldName: string): boolean {
    const field = this.remboursementForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched || this.submitted) : false;
  }
}
