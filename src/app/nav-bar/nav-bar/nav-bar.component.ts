import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input()
  isAdmin: any;
  @Input()
  isCustomer: any;
  @Input()
  isSales: any;
  @Input()
  isBilling: any;
  @Input()
  isCollection: any;

  constructor() { }

  ngOnInit(): void {
  }

}
