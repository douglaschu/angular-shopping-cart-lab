// imports Angular libraries, API service, templates, and routing (linking) between pages
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
  // sets the home page the user sees

  items: Item[] = [];
  editItem: Item;

  constructor(public apiService: CartApiService, private route: ActivatedRoute, private router: Router) { }
  // injects API service and routing 

  ngOnInit(): void { // What loads when navigating to the page, or the default view. 
    this.getAllItems(); // to display all the shop's products
    this.apiService.getAllItems().subscribe((data: {}) => {
      console.log(data); // this is for debugging - I want to see if the getAllItems method is working regardless of HTML/CSS formatting 
      this.itemData = data;
    }); 
  }

    // GET method (pulling from API)
    getAllItems(): void {
      this.apiService.getAllItems().subscribe((resp: any) => {
        this.items = resp;
        console.log(this.items);
      });
    }
    
    //Alternate method from angular.io tutorial that I decided to not use 
    // getAllItems(): void {
    //   this.apiService.getAllItems().subscribe((allItems: any[]) => {
    //     //console.log(allItems);
    //     this.cart = allItems;
    //   })
    // };

    //DELETE method (deleting products)
    deleteItem(id: number): void {
      this.apiService.deleteItem(id)
        .subscribe(() => {
            this.getAllItems();
          }, (err) => {
            console.log(err);
          }
        );
    }
    //angular.io delete method, not used
    // deleteItem(id: number): void {
    //   this.items = this.items.filter(item => item !== item);
    //   this.apiService.deleteItem(id).subscribe();
    //   this.getAllItems();
    // };

    //POST method (Adding new products based on user inputting properties)
    addItem(): void {
      this.apiService.addItem(this.itemData).subscribe(() => {
        this.getAllItems();
      });

    }
    
   //PUT method (User input to edit product properties)
   updateItem(): void {
    this.apiService.updateItem(this.route.snapshot.params.id, this.itemData).subscribe((result) => {
      this.getAllItems(); //
    }, (err) => { // displays error message in console if there's an input we want to designate as an error
      console.log(err);
    });
  }

  

  

}
