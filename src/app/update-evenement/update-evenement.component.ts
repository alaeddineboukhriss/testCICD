import { Component, OnInit } from '@angular/core';
import { Evenement } from 'app/Evenement';
import { EvenementService } from 'app/evenement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-evenement',
  templateUrl: './update-evenement.component.html',
  styleUrls: ['./update-evenement.component.scss']
})
export class UpdateEvenementComponent implements OnInit {
  idevenement: number;
  evenement: Evenement;

  constructor(private route: ActivatedRoute,private router: Router,
    private evenementservice: EvenementService) { }

 

  ngOnInit(): void {
    this.evenement = new Evenement();

    this.idevenement = this.route.snapshot.params['id'];
    
    this.evenementservice.getEvenement(this.idevenement)
      .subscribe(data => {
        console.log(data)
        this.evenement = data;
      }, error => console.log(error));
  }
  updateEvenement() {
    this.evenementservice.updateEvenement(this.evenement)
      .subscribe(data => {
        console.log(data);
        this.evenement = new Evenement();
        this.gotoList();
      }, error => console.log(error));
      this.gotoList();
    }

    retour(){
      this.gotoList();
    }

    onSubmit() {
      this.updateEvenement;    
    }

      gotoList() {
        this.router.navigate(['/user-profile']);
      }

}
