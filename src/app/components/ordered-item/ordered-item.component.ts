import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Global } from 'src/app/global';
@Component({
  selector: 'app-ordered-item',
  templateUrl: './ordered-item.component.html',
  styleUrls: ['./ordered-item.component.scss'],
})
export class OrderedItemComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('cartItem') cartItem: CartItem;
  globalVariable = Global;
  constructor() { }

  ngOnInit() {}

}
