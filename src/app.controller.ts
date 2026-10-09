import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Product } from './models/Product.js';
import { CreateProductDto } from './models/CreateProductDto.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private products: Product[] = [
  {
    "name": "Vezeték nélküli egér",
    "category": "elektronika",
    "price": 8990,
    "stock": 12
  },
  {
    "name": "Programozás kezdőknek",
    "category": "könyv",
    "price": 6490,
    "stock": 4
  },
  {
    "name": "Mechanikus billentyűzet",
    "category": "elektronika",
    "price": 24990,
    "stock": 3
  },
  {
    "name": "Fekete kapucnis pulóver",
    "category": "ruházat",
    "price": 12990,
    "stock": 8
  },
  {
    "name": "Catan társasjáték",
    "category": "játék",
    "price": 11990,
    "stock": 0
  },
  {
    "name": "USB-C töltőkábel",
    "category": "elektronika",
    "price": 4990,
    "stock": 25
  },
  {
    "name": "Adidas sportcipő",
    "category": "ruházat",
    "price": 27990,
    "stock": 2
  },
  {
    "name": "A kis herceg",
    "category": "könyv",
    "price": 3990,
    "stock": 15
  },
  {
    "name": "LEGO City rendőrségi állomás",
    "category": "játék",
    "price": 34990,
    "stock": 5
  },
  {
    "name": "Bluetooth hangszóró",
    "category": "elektronika",
    "price": 15990,
    "stock": 7
  }
]


  @Get("/")
  @Render('index')
  getProducts() {
    const orderedProducts = [...this.products].sort((a, b) => a.price - b.price)

    return {
      products: orderedProducts
    }
  }

  @Get("/filter")
  @Render("filter")
  getFiltered(@Query("category") category: string){

    const filteredList = [...this.products].filter((elem) => elem.category == category)
    .sort((a, b) => b.stock - a.stock)

    return {
      products: filteredList,
      category
    }
  }

  @Get("/new")
  @Render("new")
  getNew(){

    return{
      message: ""
    }
  }

  @Post("/new")
  @Render("new")
  getNewProductFromForm(@Body() newProduct: CreateProductDto){
    this.products.push(
      {
        name: newProduct.name,
        category: newProduct.category,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock)
      }
    )

    const message = "Sikeres felvitel"
    return{
      message
      }
  }

}
