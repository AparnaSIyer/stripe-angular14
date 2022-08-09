import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  makePayment(stripeToken:any){
    const url = "http://localhost:5000/create-checkout-session";
    return this.http.post<any>(url,{stripeToken});
  }
}
