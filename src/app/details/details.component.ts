import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private as: ApiService,
              private route: ActivatedRoute) { }

  detail: any = {};
  id: string = '';

  ngOnInit(): void {

    this.route.params.subscribe( params =>  {
      this.id = params['id'];
      this.as.getCollectionDetails(this.id).subscribe( res => {
        this.detail = res;
        console.log(this.detail);
      });
    });
  }

}
