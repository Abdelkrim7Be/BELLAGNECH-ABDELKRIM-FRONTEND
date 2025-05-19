import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RemboursementService } from '../../../services/remboursement.service';
import { CreditService } from '../../../services/credit.service';
import { Remboursement } from '../../../models/remboursement.model';
import { Credit } from '../../../models/credit.model';

@Component({
  selector: 'app-remboursement-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './remboursement-list.component.html',
  styleUrl: './remboursement-list.component.scss'
})
export class RemboursementListComponent implements OnInit {
  remboursements: Remboursement[] = [];
  credit: Credit | null = null;
  creditId?: number;
  loading = false;
  error: string | null = null;

  constructor(
    private remboursementService: RemboursementService,
    private creditService: CreditService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.creditId = Number(this.route.snapshot.paramMap.get('creditId'));
    
    if (!isNaN(this.creditId) && this.creditId > 0) {
      this.loadCredit(this.creditId);
      this.loadRemboursements(this.creditId);
    } else {
      this.loadAllRemboursements();
    }
  }

  loadCredit(id: number): void {
    this.loading = true;
    this.creditService.getById(id).subscribe({
      next: (data) => {
        this.credit = data;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du crédit: ' + err.message;
        this.loading = false;
      }
    });
  }

  loadRemboursements(creditId: number): void {
    this.loading = true;
    this.error = null;
    
    this.remboursementService.getByCreditId(creditId).subscribe({
      next: (data) => {
        this.remboursements = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des remboursements: ' + err.message;
        this.loading = false;
      }
    });
  }

  loadAllRemboursements(): void {
    this.loading = true;
    this.error = null;
    
    this.remboursementService.getAll().subscribe({
      next: (data) => {
        this.remboursements = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des remboursements: ' + err.message;
        this.loading = false;
      }
    });
  }

  deleteRemboursement(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce remboursement?')) {
      this.loading = true;
      this.remboursementService.delete(id).subscribe({
        next: () => {
          if (this.creditId) {
            this.loadRemboursements(this.creditId);
          } else {
            this.loadAllRemboursements();
          }
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression du remboursement: ' + err.message;
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
