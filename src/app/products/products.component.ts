import { Component, OnInit, Input } from '@angular/core';
import { CartApiService } from '../cart-api.service';
import { Item } from '../Item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [CartApiService],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() itemData: any = { 
    product: '',
    price: 0,
    quantity: 0,

  }

  private baseUrl = 'http://localhost:4200/products';

  items: Item[] = [];
  editItem: Item;

  constructor(public apiService: CartApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAllItems();
  }

    // GET method
    getAllItems(): void {
      this.apiService.getAllItems().subscribe((resp: any) => {
        this.items = resp;
        console.log(this.items);
      });
    }
    
    //angular.io method 
    // getAllItems(): void {
    //   this.apiService.getAllItems().subscribe((allItems: any[]) => {
    //     //console.log(allItems);
    //     this.cart = allItems;
    //   })
    // };

    //DELETE method
    deleteItem(id: number): void {
      this.apiService.deleteItem(id)
        .subscribe(() => {
            this.getAllItems();
          }, (err) => {
            console.log(err);
          }
        );
    }
    //angular.io way
    // deleteItem(id: number): void {
    //   this.items = this.items.filter(item => item !== item);
    //   this.apiService.deleteItem(id).subscribe();
    //   this.getAllItems();
    // };

    //POST method
    addItem(): void {
      this.apiService.addItem(this.itemData).subscribe(() => {
        this.getAllItems();
      });

    }
    
    
    //first attempt, based on angular.io
    // addItem(item: Item): void {
    // const newItem: Item = {  } as Item;
    // this.apiService.addItem(newItem).subscribe(item => this.cart.push(item));
    // }
    
  

  

}
