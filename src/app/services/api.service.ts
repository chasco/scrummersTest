import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  key = 'RdJEkZGZ';
  url = 'https://www.rijksmuseum.nl/api/en/collection'; 


  constructor(private http: HttpClient) { }

  getCollection(page: number = 0, search: string = '') {
    return this.http.get(this.url + '?key=' + this.key + '&p=' + page + '&q=' + search);
  }

  getCollectionDetails(id: string) {
    return this.http.get(this.url + '/' + id + '?key=' + this.key );
  }

}
