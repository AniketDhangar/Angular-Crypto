import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private API = "https://angular-crypto-production.up.railway.app/wallet";

  constructor(private http: HttpClient) {}

  createWallets() {
    return this.http.get(`${this.API}/generate`);
  }

}