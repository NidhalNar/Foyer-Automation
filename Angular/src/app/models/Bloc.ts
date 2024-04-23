// AjoutBlocComponent TypeScript
import { Foyer } from "./Foyer";

export class Bloc {
  idBloc!: number;
  nomBloc!: string;
  capciteBloc!: number; // Utilisez le bon nom ici
  
  foyer?: Foyer;
}
