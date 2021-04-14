import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class YahooApiService {
  constructor(private httpClient: HttpClient) { }
  
}