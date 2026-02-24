import { Component } from '@angular/core';
import { Navbar } from "../../component/navbar/navbar";
import { Footer } from "../../component/footer/footer";
import { Homecomponent } from "../../component/homecomponent/homecomponent";

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, Homecomponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
