import { Reservation } from "./Reservation";
export enum Genre {
  HOMME = "HOMME",
  FEMME = "FEMME",
}

export interface UserDetails {
  id?: number,
  firstname?: string,
  lastname?: string,
  email?: string,
  password?: string,
  cin?: string,
  ecole?: string,
  role?: string
  dateNaissance?: Date;
  gender?: Genre;
  reservation?: Reservation[];
}
