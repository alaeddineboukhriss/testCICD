import { Component, OnInit } from '@angular/core';
import { Evenement } from 'app/Evenement';
import { EvenementService } from 'app/evenement.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  evenements: any;
  searchTerm: string;
  p: number =1;
  
  
  constructor(private evenementService: EvenementService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();  
  }
  reloadData() {
    this.evenementService.getEvenementList(1).subscribe(data=>{
    this.evenements=data;
    console.log(data);
    
  });
}

applyFilter(filterValue: string) {
  if(filterValue==='') {
    this.reloadData()
  } else {
  this.evenements = this.evenements.filter(i => i.titre.toLowerCase().includes(filterValue.toLowerCase()));

  }

  // this.evenements.filter = filterValue;
  console.log(this.evenements);
  
}

  deleteEvenement(idevenement: number) {
    this.evenementService.deleteEvenement(idevenement)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateEvenement(idevenement: number){
    this.router.navigate(['update', idevenement]);

}
addButton() {
  //this.router.navigate(['/add']);
  console.log("aaa");
}
public openPDF(): void {
  let DATA: any = document.getElementById('htmlData');
  html2canvas(DATA).then((canvas) => {
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save('Tableau des evenements.pdf');
  });
}
}
