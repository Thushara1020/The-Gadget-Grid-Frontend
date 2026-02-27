import { Component } from '@angular/core';
import { Navbar } from "../../component/navbar/navbar";
import { Footer } from "../../component/footer/footer";
import { Productallcomponent } from "../../component/productallcomponent/productallcomponent";

@Component({
  selector: 'app-pradctpage',
  imports: [Navbar, Footer, Productallcomponent, Productallcomponent],
  templateUrl: './pradctpage.html',
  styleUrl: './pradctpage.css',
})
export class Pradctpage {

}
