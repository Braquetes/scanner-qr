import { Component } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeSelectedFiles,
  NgxScannerQrcodeService,
  ScannerQRCodeResult
} from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  
  xd: any;

  // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  public config: ScannerQRCodeConfig = {
    // fps: 1000,
    // vibrate: 400,
    // isAuto: false,
    // isBeep: true,
    // decode: 'macintosh',
    deviceActive: 1,
    constraints: { 
      audio: false,
      video: {
        width: window.innerWidth
      }
    } 
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  constructor(private qrcode: NgxScannerQrcodeService) { }

  public onEvent(e: ScannerQRCodeResult[]): void {
    console.log(e);
  }

  public handle(action: any, fn: string): void {
    action[fn]().subscribe(console.log, alert);
  }

  public onDowload(action: any) {
    action.download().subscribe(console.log, alert);
  }

  public onSelects(files: any) {
    this.qrcode.loadFiles(files).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      this.qrCodeResult = res;
    });
  }

  public onSelects2(files: any) {
    this.qrcode.loadFilesToScan(files, this.config).subscribe((res: any) => {
      // for(const val of res){
      //   console.log(val.data[0].value);
      // }      
      if(res[0].data[0] != undefined){
        console.log('Escaneado');
        this.qrCodeResult2 = res;
        this.xd = res[0].data[0].value;
      }else{
        console.log('No se pudo escannear');
      }
    });
  }

  

}
