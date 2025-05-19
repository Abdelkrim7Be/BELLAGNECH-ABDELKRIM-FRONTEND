import { StatutCredit } from './statut-credit.enum';
import { TypeRemboursement } from './type-remboursement.enum';
import { TypeBien } from './type-bien.enum';

/**
 * Base interface for all credit types
 */
export interface Credit {
  id?: number;
  clientId: number;
  montant: number;
  tauxInteret: number;
  duree: number; // in months
  dateDebut: Date | string;
  dateFin: Date | string;
  statut: StatutCredit;
  typeRemboursement: TypeRemboursement;
  description?: string;
  type: string; // 'PERSONNEL', 'IMMOBILIER', 'PROFESSIONNEL'
}

/**
 * Interface for personal credits
 */
export interface CreditPersonnel extends Credit {
  type: 'PERSONNEL';
  motif: string; // e.g., 'EDUCATION', 'SANTE', 'VOYAGE', etc.
}

/**
 * Interface for real estate credits
 */
export interface CreditImmobilier extends Credit {
  type: 'IMMOBILIER';
  adresseBien: string;
  valeurBien: number;
  typeBien: TypeBien;
  apport: number;
}

/**
 * Interface for professional credits
 */
export interface CreditProfessionnel extends Credit {
  type: 'PROFESSIONNEL';
  nomEntreprise: string;
  siret: string;
  chiffreAffaires: number;
  activite: string;
}
