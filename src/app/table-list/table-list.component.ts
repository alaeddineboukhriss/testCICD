import { Component, OnInit } from '@angular/core';
import { Evenement } from 'app/Evenement';
import { EvenementService } from 'app/evenement.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  evenements:any=[];
  
  
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
  participe(idParticipe: any) {
   // console.log('hhhh', idParticipe);
    
    this.evenementService.participeEvenement(1,idParticipe).subscribe(e=>{
      console.log(e);
      
    });
   // console.log('gggg');
    
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
