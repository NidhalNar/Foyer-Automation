import { Component, ViewChild } from '@angular/core';
import { FoyerService } from 'src/app/services/foyer.service';
import { UniversityService } from 'src/app/services/university.service';
class Foyer {
  idFoyer: any
  nomFoyer: any
  capciteFoyer: any
  type : any
}

@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.css']
})
export class FoyerComponent {
  foyer = new Foyer()
  allFoyer: any
  allUniversite: any
  universiteSelected: any
  idFoyerToAffect : any
  isAdd = true
  idFoyerToDelete: any
  qrCodeImage: any;
  types: any
  filter :any
  grouvenerats:any
  @ViewChild('closeButton') closeButton: any
  
  @ViewChild('closeButtonDelete') closeButtonDelete: any
  @ViewChild('closeButtonAffect') closeButtonAffect: any
  filterType:any

  constructor(
    private foyerService: FoyerService,
    private universityService: UniversityService
  ) { }

  ngOnInit(): void {
    this.getAllTypeFoyer()
    this.getUnv()
    this.get()
    this.getGouvernerat()
  }


  getAllTypeFoyer(){
    this.foyerService.getAllTypeFoyer().subscribe(res=>{
      this.types = res
    })
  }
  filterFoyer(){
    console.log(this.filter);
    if(this.filter == 'ALL'){
      this.get()
    }else{
      this.foyerService.getFoyersByGrouvenerat(this.filter).subscribe(res=>{
        this.allFoyer = res
      })
    }
    
  }

  filterFoyerType(){
    if(this.filter == 'ALL'){
      this.get()
    }else{
      this.foyerService.getFoyersByType(this.filterType).subscribe(res=>{
        console.log(res);
        
        this.allFoyer = res
      })
    }
  }

  //GET All UNIVERSITIES 
  getUnv() {
    this.universityService.getWhereFoyerIsNull().subscribe(res => {
      this.allUniversite = res
      console.log("getUnv", this.allUniversite)
    })
  }
 

  getGouvernerat(){
    this.universityService.getAllGourvernerats().subscribe(res=>{
      this.grouvenerats = res
    })
  }



  //CRUD FOYER
  get() {
    this.foyerService.get().subscribe(res => {
      console.log('get', res)
      this.allFoyer = res
    })
  }
  add() {
    console.log('add', this.foyer)
    this.foyerService.add(this.foyer).subscribe(res => {
      this.closeButton.nativeElement.click()
      this.get()
      this.foyer = new Foyer()
    })
  }
  editAction() {
    this.foyerService.edit(this.foyer).subscribe(res => {
      this.closeButton.nativeElement.click()
      this.foyer = new Foyer()
      this.get()
    })
  }
  deleteAction() {
    this.foyerService.delete(this.idFoyerToDelete).subscribe(res => {
      this.closeButtonDelete.nativeElement.click()
      this.get()
    })
  }
  getQRCodeImage(data:any) {
    this.foyerService.getQRCodeImage(data).subscribe((data: any) => {
      this.createImageFromBlob(data);
    }, error => {
      console.error(error);
    });
  }
  qrcodeAction(i:any){
    console.log(i.nomFoyer)
    this.getQRCodeImage(i.nomFoyer)
  }

  //UTIL FONCTION
 
  





  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.qrCodeImage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }




  //MODAL CONTROLLER
  edit(i: any) {
    this.isAdd = false
    this.foyer = i
  }
  delete(i: any) {
    this.idFoyerToDelete = i.idFoyer
    console.log(this.idFoyerToDelete)
    
  }
  affect(i:any){
    console.log(i);
    
    this.idFoyerToAffect = i
  }
}
