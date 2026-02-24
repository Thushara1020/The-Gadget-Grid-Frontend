import { Component } from '@angular/core';
import { Navbar } from "../../component/navbar/navbar";
import { Footer } from "../../component/footer/footer";
import { Homecomponent } from "../../component/homecomponent/homecomponent";
import { Productcomponent } from "../../component/productcomponent/productcomponent";

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, Homecomponent, Productcomponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
