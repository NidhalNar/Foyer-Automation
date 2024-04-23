import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FoyerService } from 'src/app/services/foyer.service';
import { UniversityService } from 'src/app/services/university.service';
class Universite {
  nomUniversite: any
  adresse: any
  idUniversite: any
  grouvenerat: any
}
@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent {
  universite = new Universite()
  allUniversite: any
  isAdd = true
  allFoyer :any
  idUniversityToDelete: any
  @ViewChild('closeButton') closeButton: any
  @ViewChild('closeButtonDelete') closeButtonDelete: any
  @ViewChild('closeButtonAffect') closeButtonAffect: any

  foyerSelected:any
  grouvenerats: any
  unvToAffect:any
  constructor(
    private universiteService: UniversityService,
    private http: HttpClient,
    private foyerService : FoyerService
  ) { }

  ngOnInit(): void {
    this.getGouvernerat()
    this.get()
    this.getAllFoyer()
  }

  affect(i:any){
    this.unvToAffect = i
    console.log(i)
  }
  getAllFoyer() {
    this.foyerService.get().subscribe(res => {
      console.log('get', res)
      this.allFoyer = res
    })
  }

  onFoyerChange(data: any) {
    this.foyerSelected = data.target.value
    console.log(this.foyerSelected);
    
  }

  affectAction(){
    console.log(this.foyerSelected);
    console.log(this.unvToAffect)
    this.universiteService.affect(this.foyerSelected , this.unvToAffect.nomUniversite).subscribe(res=>{
      this.get()
      this.closeButtonAffect.nativeElement.click()
    })
    
  }

  getGouvernerat() {
    this.universiteService.getAllGourvernerats().subscribe(res => {
      this.grouvenerats = res
    })
  }

  get() {
    this.universiteService.getUniversite().subscribe(res => {
      console.log('get', res)
      this.allUniversite = res
    })

  }

  add() {
    console.log('add', this.universite)
    this.universiteService.add(this.universite).subscribe(res => {
      this.closeButton.nativeElement.click()
      this.get()
      this.universite = new Universite()
    })
  }

  edit(i: any) {
    this.isAdd = false
    this.universite = i
  }

  editAction() {
    this.universiteService.edit(this.universite).subscribe(res => {
      this.closeButton.nativeElement.click()
      this.universite = new Universite()
      this.get()
    })
  }

  delete(i: any) {
    this.idUniversityToDelete = i.idUniversite
    console.log(this.idUniversityToDelete)
  }

  deleteAction() {
    this.universiteService.delete(this.idUniversityToDelete).subscribe(res => {
      this.closeButtonDelete.nativeElement.click()
      this.get()
    })
  }
}
