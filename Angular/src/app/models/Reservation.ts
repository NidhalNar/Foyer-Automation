import { UserDetails } from "./userDetails";

export class Reservation {
    idReservation!: number;
    anneeUniversitaire!: Date;
    estValide!: boolean;
    roommates!: UserDetails[];
  }
  