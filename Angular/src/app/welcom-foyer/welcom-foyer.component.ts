import { Component } from '@angular/core';
import { FoyerService } from '../services/foyer.service';

@Component({
  selector: 'app-welcom-foyer',
  templateUrl: './welcom-foyer.component.html',
  styleUrls: ['./welcom-foyer.component.css']
})
export class WelcomFoyerComponent {
  allFoyer : any
  constructor(private foyerService: FoyerService,){}

  ngOnInit(): void {
    this.get()
  }


  get() {
    this.foyerService.get().subscribe(res => {
      console.log('get', res)
      this.allFoyer = res
    })
  }
}
