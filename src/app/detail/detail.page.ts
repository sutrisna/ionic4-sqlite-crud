import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  totalNilai: number;
  data: any;

  constructor(public param: ActivatedRoute) { }

  ngOnInit() {
    this.data = JSON.parse(this.param.snapshot.paramMap.get('data'));
    console.log(JSON.parse(this.param.snapshot.paramMap.get('data')));
    // this.totalNilai = JSON.parse(this.param.snapshot.paramMap.get('data'));
  }

}
