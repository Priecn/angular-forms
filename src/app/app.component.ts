import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') userForm: NgForm;
  defaultSecretValue: string = 'pet';
  answer: string;
  genders = ['Male', 'Female'];
  isSubmitted: boolean = false;
  user = {
    name: '',
    email: '',
    gender: '',
    secret: {
      question: '',
      answer: ''
    }
  }
  /* onSubmit(form: HTMLFormElement) {
    console.log(form);
  } */

  suggestUsername(){
    this.userForm.form.patchValue({
      userData : {
        username: 'suggested name'
      }
    });

    /* this.userForm.setValue({
      userData: {
        username: 'suggested name',
        email: ''
      },
      secret: '',
      answer: '',
      gender: 'Male'
    }); */
  }

  onSubmit(form: NgForm) {
    //console.log(form);
    this.user.name = form.value.userData.username;
    this.user.email = form.value.userData.email;
    this.user.secret.question = form.value.secret;
    this.user.secret.answer = form.value.answer;
    this.user.gender = form.value.gender;
    this.isSubmitted = true;
    form.reset();
  }
}
