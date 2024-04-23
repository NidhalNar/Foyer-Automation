// all-reservations-etudiant.component.ts
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chambre } from 'src/app/models/Chambre';
import { UserDetails } from 'src/app/models/userDetails';
import { EtudiantService } from 'src/app/services/serviceEtudiant/etudiant.service';

@Component({
  selector: 'app-all-reservations-etudiant',
  templateUrl: './all-reservations-etudiant.component.html',
  styleUrls: ['./all-reservations-etudiant.component.css']
})
export class AllReservationsEtudiantComponent implements OnInit {

  chambres: Chambre[] = [];
  users: UserDetails[] = [];
  currentPage = 0;
  pageSize = 5;
  currentYear: number = new Date().getFullYear(); // Add this line

  constructor(private _etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.loadEtudiants();
  }

    loadEtudiants(page: number = 0): void {
      this.currentPage = page;
  
      this._etudiantService.getPaginatedUsers(this.currentPage, this.pageSize).subscribe(
        (data: UserDetails[]) => {
          console.log('Étudiants paginés reçus :', data);
          this.users = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des étudiants paginés:', error);
        }
      );
    }

  nextPage(): void {
    const nextPage = this.currentPage + 1;
    this.loadPage(nextPage);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      const prevPage = this.currentPage - 1;
      this.loadPage(prevPage);
    }
  }

  private loadPage(page: number): void {
    this._etudiantService.getPaginatedUsers(page, this.pageSize).subscribe(
      (data: UserDetails[]) => {
        console.log('Étudiants paginés reçus :', data);
        this.users = data;
        this.currentPage = page; // Update current page after successful data load
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants paginés:', error);
      }
    );
  }
  downloadExcelID(id: number): void {
    this._etudiantService.exportUserToExcel(id)
      .subscribe(response => {
        const blob = new Blob([response.body ?? ''], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `etudiant_${id}.xlsx`;
        link.click();
      });
  }

  downloadExcel(): void {
    this._etudiantService.exportToExcel().subscribe(
      (response: HttpResponse<Blob>) => {
        const blob: Blob = response.body as Blob; // Extract the Blob from the HttpResponse
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `users.xlsx`;
        link.click();
      },
      (error) => {
        console.error('Erreur lors de l\'export Excel :', error);
      }
    );
  }
  
  refreshUsers() {
    this._etudiantService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Erreur lors de la récupération des Users  :', error);
      }
    );
  }
}
