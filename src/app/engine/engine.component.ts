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
            this.listGetterService.getList().subscribe(
              (data) => {
                //console.log(data);
                this.products = data.content;
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
                //console.log(this.products);
                //console.log(this.conditions);
              });
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
}