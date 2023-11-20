import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.page.html',
  styleUrls: ['./codigoqr.page.scss'],
})
export class CodigoqrPage implements OnInit {
  public qrdata : string = '';
  public dataClases: any = {};
  constructor(private data: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.dataClases = this.data.getClasesData();
    this.qrdata = `http://localhost:3300/clases_registradas/${this.dataClases.id}`
  }

  
}
