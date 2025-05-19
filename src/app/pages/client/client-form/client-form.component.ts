import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup;
  clientId?: number;
  isEditMode = false;
  loading = false;
  error: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Check if we're in edit mode
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !isNaN(this.clientId) && this.clientId > 0;
    
    if (this.isEditMode) {
      this.loadClient(this.clientId!);
    }
  }

  initForm(): void {
    this.clientForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      prenom: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      adresse: ['', [Validators.required]],
      dateNaissance: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      revenuMensuel: [0, [Validators.required, Validators.min(0)]]
    });
  }

  loadClient(id: number): void {
    this.loading = true;
    this.clientService.getById(id).subscribe({
      next: (client) => {
        // Format date for input field
        if (client.dateNaissance && typeof client.dateNaissance === 'string') {
          client.dateNaissance = client.dateNaissance.split('T')[0];
        }
        
        this.clientForm.patchValue(client);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du client: ' + err.message;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.clientForm.invalid) {
      return;
    }
    
    this.loading = true;
    const clientData: Client = this.clientForm.value;
    
    if (this.isEditMode) {
      clientData.id = this.clientId;
      this.clientService.update(clientData).subscribe({
        next: () => {
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          this.error = 'Erreur lors de la mise à jour du client: ' + err.message;
          this.loading = false;
        }
      });
    } else {
      this.clientService.add(clientData).subscribe({
        next: () => {
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          this.error = 'Erreur lors de l\'ajout du client: ' + err.message;
          this.loading = false;
        }
      });
    }
  }

  // Helper method to check if a field is invalid and touched
  isInvalid(fieldName: string): boolean {
    const field = this.clientForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched || this.submitted) : false;
  }
}
