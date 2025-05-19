import { StatutRemboursement } from './statut-remboursement.enum';

/**
 * Interface representing a repayment in the system
 */
export interface Remboursement {
  id?: number;
  creditId: number;
  montant: number;
  dateEcheance: Date | string;
  datePaiement?: Date | string;
  montantPenalite?: number;
  statut: StatutRemboursement;
  numeroEcheance: number;
  commentaire?: string;
}
