import { Component } from '@angular/core';
import { Navbar } from "../../component/navbar/navbar";
import { Footer } from "../../component/footer/footer";
import { Ordercomponent } from "../../component/ordercomponent/ordercomponent";

@Component({
  selector: 'app-orderpage',
  imports: [Navbar, Footer, Ordercomponent],
  templateUrl: './orderpage.html',
  styleUrl: './orderpage.css',
})
export class Orderpage {

}
