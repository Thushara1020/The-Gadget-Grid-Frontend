import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-createaccountcomponent',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './createaccountcomponent.html',
  styleUrl: './createaccountcomponent.css',
})
export class Createaccountcomponent {

  onSubmit() {
    console.log("Account Creation Requested!");
  }

}
