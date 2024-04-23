import { Bloc } from "./Bloc";
import { Evaluation } from "./Evaluation";
import { Reservation } from "./Reservation";

export enum TypeChambre {
  SIMPLE = "SIMPLE",
  DOUBLE = "DOUBLE",
  TRIPLE = "TRIPLE"
}

export class Chambre {
  idChambre!: number;
  numerochambre!: number;
  typechambre!: TypeChambre;
  bloc!: Bloc; 
  evaluations?: Evaluation[];
  noteEvaluation?: number; 
  reservations!: Reservation[];

}


  