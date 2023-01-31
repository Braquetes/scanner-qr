import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  tokens: Array<any> = [];
  numTokens: any;
  preToken: any;
  ini: any;

  xd: any;
  data: any;
  curp: any;
  final: any;
  age: any;
  showAge: any;
  bisiesto: any;

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
        // width: window.innerWidth
      }
    }
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  constructor(private qrcode: NgxScannerQrcodeService) { }

  ngOnInit() {}

  onSubmit(f: NgForm) {
    // console.log(f.value.cantidad);
    this.numTokens = f.value.cantidad;
    this.ini = f.value.inicial;
    let k = 0;
    let r = 0;

    for (let i = 0; i < this.numTokens; i++) {

      var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      var charLength = chars.length;
      this.preToken = this.ini.toString();
      for (let i = 0; i < 7; i++) {
        this.preToken += chars.charAt(Math.floor(Math.random() * charLength));
      }

      const words = this.tokens;
      const result = words.filter(word => word == this.preToken);
      if (result[0] != null) {
        console.log('igual');
        r++;
      }
      // console.log("k :" + k + " " + this.preToken);
      // k++

      this.tokens.push(this.preToken);
    }
    console.log(this.tokens);
    console.log(r);
    // console.log(f.valid);  // false
  }

  public onEvent(res: any, action: any, fn: string): void {
    const xdxd = res[0]?.value;
    console.log(xdxd);
    if (xdxd != undefined) {
      console.log('Escaneado');

      if (res[0]?.value != undefined) {
        console.log('Escaneado');
        this.qrCodeResult2 = res;
        this.xd = res[0]?.value;
        this.data = this.xd.split('||');
        this.curp = this.data[0];
        // console.log(this.data[1]);
        this.data = this.data[1];
        // console.log(this.curp);
        this.data = this.data.split('|');
        // console.log(this.data);

        const cad = this.data[4];

        var separarCadena = cad.split("/");
        // ["h", "o", "l", "a"]

        var invertirArreglo = separarCadena.reverse();
        // ["a", "l", "o", "h"]

        var unirArreglo = invertirArreglo.join("/");
        // "aloh"

        console.log(unirArreglo);

        this.age = unirArreglo;

        this.ageCalculator();
      } else {
        console.log('No se pudo escannear');
      }

      action[fn]().subscribe(console.log, alert);
    }
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
      if (res[0].data[0] != undefined) {
        console.log('Escaneado');
        this.qrCodeResult2 = res;
        this.xd = res[0].data[0].value;
        this.data = this.xd.split('||');
        this.curp = this.data[0];
        // console.log(this.data[1]);
        this.data = this.data[1];
        // console.log(this.curp);
        this.data = this.data.split('|');
        // console.log(this.data);

        const cad = this.data[4];

        var separarCadena = cad.split("/");
        // ["h", "o", "l", "a"]

        var invertirArreglo = separarCadena.reverse();
        // ["a", "l", "o", "h"]

        var unirArreglo = invertirArreglo.join("/");
        // "aloh"

        console.log(unirArreglo);

        this.age = unirArreglo;

        this.ageCalculator();
      } else {
        console.log('No se pudo escannear');
      }
    });
  }

  ageCalculator() {

    if (this.age) {
      const convertAge = new Date(this.age);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / 365 / 24 / 60 / 60 / 1000));
      console.log(this.showAge);
      if (this.showAge > 12) {
        alert('Mayor de 12 años');
      }
    }

  }

  reload() {
    console.log('reload');
    this.xd = '';
  }

}
