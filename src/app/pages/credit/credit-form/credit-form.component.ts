import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditService } from '../../../services/credit.service';
import { ClientService } from '../../../services/client.service';
import { Credit } from '../../../models/credit.model';
import { Client } from '../../../models/client.model';
import { StatutCredit } from '../../../models/statut-credit.enum';
import { TypeRemboursement } from '../../../models/type-remboursement.enum';
import { TypeBien } from '../../../models/type-bien.enum';

@Component({
  selector: 'app-credit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './credit-form.component.html',
  styleUrl: './credit-form.component.scss'
})
export class CreditFormComponent implements OnInit {
  creditForm!: FormGroup;
  creditId?: number;
  clientId?: number;
  isEditMode = false;
  loading = false;
  error: string | null = null;
  submitted = false;
  
  clients: Client[] = [];
  selectedCreditType: string = 'PERSONNEL';
  
  // Enums for select options
  statutCreditOptions = Object.values(StatutCredit);
  typeRemboursementOptions = Object.values(TypeRemboursement);
  typeBienOptions = Object.values(TypeBien);

  constructor(
    private fb: FormBuilder,
    private creditService: CreditService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if we're in edit mode
    this.creditId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !isNaN(this.creditId) && this.creditId > 0;
    
    // Check if we have a client ID from the route
    this.clientId = Number(this.route.snapshot.paramMap.get('clientId'));
    
    this.initForm();
    this.loadClients();
    
    if (this.isEditMode) {
      this.loadCredit(this.creditId!);
    }
  }

  initForm(): void {
    this.creditForm = this.fb.group({
      clientId: [this.clientId || '', [Validators.required]],
      type: [this.selectedCreditType, [Validators.required]],
      montant: ['', [Validators.required, Validators.min(1)]],
      tauxInteret: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      duree: ['', [Validators.required, Validators.min(1)]],
      dateDebut: ['', [Validators.required]],
      dateFin: ['', [Validators.required]],
      statut: [StatutCredit.EN_COURS, [Validators.required]],
      typeRemboursement: [TypeRemboursement.MENSUEL, [Validators.required]],
      description: [''],
      
      // Fields for PERSONNEL
      motif: [''],
      
      // Fields for IMMOBILIER
      adresseBien: [''],
      valeurBien: [''],
      typeBien: [TypeBien.APPARTEMENT],
      apport: [''],
      
      // Fields for PROFESSIONNEL
      nomEntreprise: [''],
      siret: [''],
      chiffreAffaires: [''],
      activite: ['']
    });
    
    // Add conditional validation based on credit type
    this.creditForm.get('type')?.valueChanges.subscribe(type => {
      this.selectedCreditType = type;
      this.updateValidators();
    });
  }

  updateValidators(): void {
    // Reset all specific validators
    this.creditForm.get('motif')?.clearValidators();
    this.creditForm.get('adresseBien')?.clearValidators();
    this.creditForm.get('valeurBien')?.clearValidators();
    this.creditForm.get('typeBien')?.clearValidators();
    this.creditForm.get('apport')?.clearValidators();
    this.creditForm.get('nomEntreprise')?.clearValidators();
    this.creditForm.get('siret')?.clearValidators();
    this.creditForm.get('chiffreAffaires')?.clearValidators();
    this.creditForm.get('activite')?.clearValidators();
    
    // Add validators based on selected type
    if (this.selectedCreditType === 'PERSONNEL') {
      this.creditForm.get('motif')?.setValidators([Validators.required]);
    } else if (this.selectedCreditType === 'IMMOBILIER') {
      this.creditForm.get('adresseBien')?.setValidators([Validators.required]);
      this.creditForm.get('valeurBien')?.setValidators([Validators.required, Validators.min(1)]);
      this.creditForm.get('typeBien')?.setValidators([Validators.required]);
      this.creditForm.get('apport')?.setValidators([Validators.required, Validators.min(0)]);
    } else if (this.selectedCreditType === 'PROFESSIONNEL') {
      this.creditForm.get('nomEntreprise')?.setValidators([Validators.required]);
      this.creditForm.get('siret')?.setValidators([Validators.required, Validators.pattern(/^\d{14}$/)]);
      this.creditForm.get('chiffreAffaires')?.setValidators([Validators.required, Validators.min(1)]);
      this.creditForm.get('activite')?.setValidators([Validators.required]);
    }
    
    // Update validity
    this.creditForm.get('motif')?.updateValueAndValidity();
    this.creditForm.get('adresseBien')?.updateValueAndValidity();
    this.creditForm.get('valeurBien')?.updateValueAndValidity();
    this.creditForm.get('typeBien')?.updateValueAndValidity();
    this.creditForm.get('apport')?.updateValueAndValidity();
    this.creditForm.get('nomEntreprise')?.updateValueAndValidity();
    this.creditForm.get('siret')?.updateValueAndValidity();
    this.creditForm.get('chiffreAffaires')?.updateValueAndValidity();
    this.creditForm.get('activite')?.updateValueAndValidity();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des clients: ' + err.message;
      }
    });
  }

  loadCredit(id: number): void {
    this.loading = true;
    this.creditService.getById(id).subscribe({
      next: (credit) => {
        // Format dates for input fields
        if (credit.dateDebut && typeof credit.dateDebut === 'string') {
          credit.dateDebut = credit.dateDebut.split('T')[0];
        }
        if (credit.dateFin && typeof credit.dateFin === 'string') {
          credit.dateFin = credit.dateFin.split('T')[0];
        }
        
        this.selectedCreditType = credit.type;
        this.creditForm.patchValue(credit);
        this.updateValidators();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du crédit: ' + err.message;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.creditForm.invalid) {
      return;
    }
    
    this.loading = true;
    const creditData = this.prepareFormData();
    
    if (this.isEditMode) {
      creditData.id = this.creditId;
      this.creditService.update(creditData).subscribe({
        next: () => {
          this.navigateAfterSave();
        },
        error: (err) => {
          this.error = 'Erreur lors de la mise à jour du crédit: ' + err.message;
          this.loading = false;
        }
      });
    } else {
      this.creditService.add(creditData).subscribe({
        next: () => {
          this.navigateAfterSave();
        },
        error: (err) => {
          this.error = 'Erreur lors de l\'ajout du crédit: ' + err.message;
          this.loading = false;
        }
      });
    }
  }

  prepareFormData(): Credit {
    const formValue = this.creditForm.value;
    const creditData: any = {
      clientId: formValue.clientId,
      type: formValue.type,
      montant: formValue.montant,
      tauxInteret: formValue.tauxInteret,
      duree: formValue.duree,
      dateDebut: formValue.dateDebut,
      dateFin: formValue.dateFin,
      statut: formValue.statut,
      typeRemboursement: formValue.typeRemboursement,
      description: formValue.description
    };
    
    // Add type-specific fields
    if (formValue.type === 'PERSONNEL') {
      creditData.motif = formValue.motif;
    } else if (formValue.type === 'IMMOBILIER') {
      creditData.adresseBien = formValue.adresseBien;
      creditData.valeurBien = formValue.valeurBien;
      creditData.typeBien = formValue.typeBien;
      creditData.apport = formValue.apport;
    } else if (formValue.type === 'PROFESSIONNEL') {
      creditData.nomEntreprise = formValue.nomEntreprise;
      creditData.siret = formValue.siret;
      creditData.chiffreAffaires = formValue.chiffreAffaires;
      creditData.activite = formValue.activite;
    }
    
    return creditData;
  }

  navigateAfterSave(): void {
    if (this.clientId) {
      this.router.navigate(['/clients', this.clientId, 'credits']);
    } else {
      this.router.navigate(['/credits']);
    }
  }

  // Helper method to check if a field is invalid and touched
  isInvalid(fieldName: string): boolean {
    const field = this.creditForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched || this.submitted) : false;
  }
}
