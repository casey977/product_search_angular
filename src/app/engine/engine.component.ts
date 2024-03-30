import {Component, Inject, PLATFORM_ID, Input} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SearchbarComponent} from '../searchbar/searchbar.component';
import {ProductlistComponent} from '../productlist/productlist.component';
import {ListgetterService} from '../listgetter.service';
import {CommonModule, isPlatformBrowser} from '@angular/common';

interface Product {
  title: string;
}

@Component({
  selector: 'app-engine',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SearchbarComponent,
    ProductlistComponent
  ],
  templateUrl: './engine.component.html',
  styleUrl: './engine.component.css'
})
export class EngineComponent {
  title = 'product_list';
  products = [];
  conditions:boolean[] = [];
  last_search:string = '';
  new_search:string = '';
  new_search_array:string[] = [];
  check:boolean = false;
  waitTime:number = 3000;
  timer:number = this.waitTime;
  page:number = 0;
  page_num:number = 10;

  setPrevPage:boolean = false;
  setNextPage:boolean = false;

  products_to_list = [];
  products_to_show = [];

  constructor(
    private listGetterService:ListgetterService,
    @Inject(PLATFORM_ID) private platformId: object) {
      this.conditions = [];
  };

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        if (this.check) {
          this.timer -= 1000;
          if (this.timer <= 0) {
            this.check = false;
            this.timer = this.waitTime;
            this.products = [];
            this.conditions = [];
            this.products_to_list = [];
            this.products_to_show = [];
            this.listGetterService.getList().subscribe(
              (data) => {
                this.products = data.content;
                this.page = 0;
                this.products.forEach((value:Product) => {
                  let check:number = 0;
                  this.new_search_array = this.new_search.split(' ');
                  this.new_search_array.forEach((entry) => {
                    if (value.title.toLowerCase().includes(entry.toLowerCase())) {
                      
                    } else {
                      check += 1;
                    }
                  });

                  if (check > 0) {
                    check = 0;
                    this.conditions.push(false);
                  } else {
                    this.conditions.push(true);
                  }
                });

                for (let i = 0; i < this.conditions.length; i++) {
                  if (this.conditions[i] === true) {
                    this.products_to_list.push(this.products[i]);
                  }
                }

                this.products_to_show = this.products_to_list.slice(0, this.page_num);
              }
            );
          }
        }
      }, 1000);
    }
  }

  handleNewSearch(searchTerm:string) {
    this.new_search = searchTerm;
    if (this.last_search !== this.new_search) {
      this.check = true;
      this.timer = this.waitTime;
      this.last_search = this.new_search;
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.products_to_show = this.products_to_list.slice(this.page_num * this.page, this.page_num * this.page + this.page_num);
    }
  }

  nextPage() {
    if (this.page < Math.ceil(this.products_to_list.length / this.page_num) - 1) {
      this.page++;
      this.products_to_show = this.products_to_list.slice(this.page_num * this.page, this.page_num * this.page + this.page_num);
    }
  }
}