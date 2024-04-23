import { Reservation } from './Reservation';  // Assurez-vous de fournir le chemin correct

export class Etudiant {
  idEtudiant!: number;
  lastname!: string;
  firstname!: string;
  dateNaissance!: Date;
  email!: string;
  cin!: number;
  ecole!: string;
  reservation!: Reservation[];  // Ajout de la référence à la classe Reservation
}
