import { Component } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {

  wallet: any;

  showBTC = false;
  showETH = false;
  showTRON = false;
  showUSDT_ERC20 = false;
  showUSDT_TRC20 = false;

  constructor(private walletService: WalletService) {}

  generateWallet() {

    this.walletService.createWallets().subscribe((res:any) => {
      this.wallet = res;
    });

  }
  copy(value: string) {
  navigator.clipboard.writeText(value);
  alert("Copied to clipboard");
}

  toggleBTC(){ this.showBTC = !this.showBTC; }
  toggleETH(){ this.showETH = !this.showETH; }
  toggleTRON(){ this.showTRON = !this.showTRON; }
  toggleUSDT_ERC20(){ this.showUSDT_ERC20 = !this.showUSDT_ERC20; }
  toggleUSDT_TRC20(){ this.showUSDT_TRC20 = !this.showUSDT_TRC20; }

}