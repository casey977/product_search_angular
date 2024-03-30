import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from '../product/product.component';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule
  ],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent {
  constructor() {};

  @Input() products_to_show = [];
  @Input() conditions:boolean[] = [];
}
