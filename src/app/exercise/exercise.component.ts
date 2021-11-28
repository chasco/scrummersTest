import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  myArray = [
  'rope',
  'pore',
  'repo',
  'red rum',
  'murder',
  'listen',
  'silent',
  'endeavour'
  ];
  result:any = [];

  page: number = 1;
  searchValue: string = '';
  collection: any = [];

  constructor(private as: ApiService,
              private router: Router) { }

  ngOnInit(): void {

    let arrayAux: any = [];

    this.myArray.map((value, index) => {

      console.log(value);
      let exists = 0;

      if (index === 0) {
        for (let i = 0; i < this.myArray.length;i++) 
          if (this.compare(value,this.myArray[i]) ) {
            arrayAux.push(this.myArray[i]);
          }
        this.result.push(arrayAux);
        arrayAux = [];
      }
      else {
        for (let j = 0; j < this.result.length; j++)
        if (this.result[j].indexOf(value) !== -1) {
          exists = 1;
        }
        if (exists === 0) {  
          for (let i = 0; i < this.myArray.length;i++) 
            if (this.compare(value,this.myArray[i])) {
              arrayAux.push(this.myArray[i]);
            }
            this.result.push(arrayAux);
            arrayAux = [];
        }

      }

    });

    console.log(this.result);

    
    this.as.getCollection().subscribe( res => {
      this.collection = res;
      console.log(this.collection);
    });

  }

  compare(stringOne: string, stringTwo: string) {
    
    let auxOne = stringOne.replace(' ', '');
    let auxTwo = stringTwo.replace(' ', '');

    let match = 0;

    if (auxOne.length === auxTwo.length) {
      for (let i = 0; i < auxOne.length; i++) {
        for (let j = 0; j < auxTwo.length; j++) {
          if (auxOne[i] === auxTwo[j]) {
            match++;
            break;
          }
        }
      }
      if (match === auxOne.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    } 
    
  }

  detail(id: string) {
    this.router.navigate(['',id]);
  }

  nextPage() {
    this.page++;
    this.as.getCollection(this.page).subscribe( res => {
      this.collection = res;
      console.log(this.collection);        
    });
  }

  previusPage() {
    if (this.page > 1) {
      this.page--;
      this.as.getCollection(this.page).subscribe( res => {
        this.collection = res;
        console.log(this.collection);        
      });
    }
  }

  search() {
    this.page = 1;
    this.as.getCollection(this.page, this.searchValue).subscribe( res => {
      this.collection = res;
      console.log(this.collection);
    });
  }


}
