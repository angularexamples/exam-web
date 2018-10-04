import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class UserFormService {

  validationMessages: any;
  // Set up errors object
  formErrors = {
    first_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    password: ''
  };
  
  constructor() {
    this.validationMessages = {
      first_name: {
        required: `First Name is <strong>required</strong>.`,
        pattern: 'Enter Only Alphabets',
      },
      last_name: {
        required: `Last Name is <strong>required</strong>.`,
        pattern: 'Enter Only Alphabets',
      },
      email: {
        required: `Email is <strong>required</strong>.`,
        email: `Email must be <strong>Formatted</strong> Correctly`
      },
      contact_number: {

        minlength: 'Contact Number should be 10digit',
        pattern: 'Contact Number should be only number',
        required: `Contact Number is <strong>required</strong>.`
      },
      password: {
        required: `Password is <strong>required</strong>.`,
        minlength: 'Password length should be 8',
      }
    };
  }

}
