/**
 * Interface representing a client in the system
 */
export interface Client {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  dateNaissance: Date | string;
  profession: string;
  revenuMensuel: number;
  dateCreation?: Date | string;
}
