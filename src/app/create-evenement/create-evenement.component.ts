import { Component, OnInit } from '@angular/core';
import { EvenementService } from 'app/evenement.service';
import { Evenement } from '../Evenement';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-evenement',
  templateUrl: './create-evenement.component.html',
  styleUrls: ['./create-evenement.component.scss']
})
export class CreateEvenementComponent implements OnInit {
evenement: Evenement= new Evenement();
submitted = false;

imgURL: any;
public imagePath;
userFile ;
public message: string;

constructor(private evenementservice: EvenementService,
  private router: Router) { }

  ngOnInit(): void {
  }
  newEvenement(): void {
    this.submitted = false;
    this.evenement= new Evenement();
  }

  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;


      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }


  }
  
  save() {
    const formData = new  FormData();
    formData.append('eve', JSON.stringify(this.evenement));
    formData.append("file", this.userFile);

    console.log(formData, 'oooo');
  
    this.evenementservice
    .createEvenement(formData).subscribe(data => {
      console.log(data)
      this.evenement = new Evenement();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  back(){
    this.gotoList();
  }

  gotoList() {
     this.router.navigate(['/user-profile']);
  }

}
