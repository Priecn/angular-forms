import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  genders = ['Male', 'Female'];
  signupForm: FormGroup;
  forbiddenUsername = ['Ram', 'Shiva'];
  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'name': new FormControl(null, [Validators.required, this.checkForbiddenName.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.checkForbiddenEmails)
      }),
      'gender': new FormControl('Male'),
      'hobbies': new FormArray([])
    });
    /* this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    ); */

    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  onSubmit(){
    console.log(this.signupForm);
  }

  onAddHobby(){
    (<FormArray>this.signupForm
                    .get('hobbies'))
                    .push(
                      new FormControl(null, Validators.required)
                    );
  }

  checkForbiddenName(control: FormControl): {[s: string]: boolean}{
    if(this.forbiddenUsername.indexOf(control.value) !== -1){
      return {'isForbidden': true};
    }
    return null;
  }

  checkForbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com') {
          resolve({'forbiddenEmail': true});
        } else {
          resolve(null);
        }
      }, 2000);
    });

    return promise;
  }
}
