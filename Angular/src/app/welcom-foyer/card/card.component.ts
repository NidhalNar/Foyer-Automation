import { Component, Input } from '@angular/core';
import { FoyerService } from 'src/app/services/foyer.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() childInput: any;

 
}
