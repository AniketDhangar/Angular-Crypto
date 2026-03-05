import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { WalletComponent } from './components/wallet/wallet.component';

@NgModule({
  
  imports: [
    BrowserModule,
    HttpClientModule,
    WalletComponent
  ],
  bootstrap: [WalletComponent]
})
export class AppModule {}