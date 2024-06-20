import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css',
})
export class SuccessPageComponent implements OnInit {
  cardData: any;
  payment: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cardData = this.dataService.getData();
    this.route.data.subscribe((v) => console.log(v));
    console.log(history.state.data)

  }
  ngOnDestroy() {
    this.payment.unsubscribe();
  }
}
