import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CreditService } from '../../../services/credit.service';
import { ClientService } from '../../../services/client.service';
import { Credit } from '../../../models/credit.model';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-credit-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './credit-list.component.html',
  styleUrl: './credit-list.component.scss'
})
export class CreditListComponent implements OnInit {
  credits: Credit[] = [];
  client: Client | null = null;
  clientId?: number;
  loading = false;
  error: string | null = null;

  constructor(
    private creditService: CreditService,
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('clientId'));
    
    if (!isNaN(this.clientId) && this.clientId > 0) {
      this.loadClient(this.clientId);
      this.loadCredits(this.clientId);
    } else {
      this.loadAllCredits();
    }
  }

  loadClient(id: number): void {
    this.loading = true;
    this.clientService.getById(id).subscribe({
      next: (data) => {
        this.client = data;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du client: ' + err.message;
        this.loading = false;
      }
    });
  }

  loadCredits(clientId: number): void {
    this.loading = true;
    this.error = null;
    
    this.creditService.getByClientId(clientId).subscribe({
      next: (data) => {
        this.credits = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des crédits: ' + err.message;
        this.loading = false;
      }
    });
  }

  loadAllCredits(): void {
    this.loading = true;
    this.error = null;
    
    this.creditService.getAll().subscribe({
      next: (data) => {
        this.credits = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des crédits: ' + err.message;
        this.loading = false;
      }
    });
  }

  deleteCredit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce crédit?')) {
      this.loading = true;
      this.creditService.delete(id).subscribe({
        next: () => {
          if (this.clientId) {
            this.loadCredits(this.clientId);
          } else {
            this.loadAllCredits();
          }
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression du crédit: ' + err.message;
          this.loading = false;
        }
      });
    }
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }

  formatMontant(montant: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(montant);
  }
}
