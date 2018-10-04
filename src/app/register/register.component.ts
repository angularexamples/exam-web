import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { UserFormModel, UserModel } from '../models/user.model';
import { Subscription } from 'rxjs';
import { UserFormService } from '../services/user-form.service';
import { UserService } from '../services/user.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider,
} from 'angular-6-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public signupForm: FormGroup;
  // Model storing initial form values
  private formEvent: UserFormModel;
  // Form validation and disabled logic
  public formErrors: any;
  formChangeSub: Subscription;
  // Form submission
  public submitEventObj: UserModel;
  public submitting: boolean;
  public submitEventSub: Subscription;
  public error: boolean;

  constructor(private _userFormService: UserFormService,
    private socialAuthService: AuthService,
    private _formBuilder: FormBuilder,
    private _userApi : UserService) { }

    public socialSignIn(socialPlatform: string) {

      let socialPlatformProvider;
  
      if (socialPlatform == "facebook") {
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      } else if (socialPlatform == "google") {
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      } else if (socialPlatform == "linkedin") {
        socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
      }
  
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(socialPlatform + " sign in data : ", userData);
          // Now sign-in with userData
          // ...
        }
      );
    }

  ngOnInit() {
    this.formErrors = this._userFormService.formErrors;
    // Set initial form data
    this.formEvent = this._setFormEvent();
    this._buildForm();
  }

  private _setFormEvent() {
    // If creating a new event, create new
    // FormEventModel with default null data
    return new UserFormModel(null, null, null, null, null);
  }
  private _buildForm() {
    let validRules = {
      first_name: [
        this.formEvent.first_name, Validators.required
      ],
      last_name: [
        this.formEvent.last_name, Validators.required
      ],
      email: [
        this.formEvent.email, [Validators.required, Validators.email]
      ],
      contact_number: [
        this.formEvent.contact_number, Validators.required
      ],
      password: [
        this.formEvent.password, Validators.required
      ]
    };
    this.signupForm = this._formBuilder.group(validRules);

    // Subscribe to form value changes
    this.formChangeSub = this.signupForm
      .valueChanges
      .subscribe(data => this._onValueChanged());
    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an event that is no
    // longer valid (for example, an event in the past)
    this._onValueChanged();
  }
  private _onValueChanged() {
    if (!this.signupForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this._userFormService.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };

    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        _setErrMsgs(this.signupForm.get(field), this.formErrors, field);
      }
    }
  }
  private _getSubmitObj() {
    return new UserModel(
      this.signupForm.get('first_name').value,
      this.signupForm.get('last_name').value,
      this.signupForm.get('email').value,
      this.signupForm.get('contact_number').value,
      this.signupForm.get('password').value,
    );
  }

  signUp() {
    this.submitting = true;
    this.submitEventObj = this._getSubmitObj();
    console.log(this.submitEventObj)
    this.submitEventSub = this._userApi
      .postEvent$(this.submitEventObj)
      .subscribe(
        data => this._handleSubmitSuccess(data),
        err => this._handleSubmitError(err)
      );
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    if (res.success) {
      // this.toastr.success(res.message, 'Success');
      // this.router.navigate(['/admin/clients']);
    }
    else {
      // this.toastr.error(res.message, 'Invalid');
    }
  }

  private _handleSubmitError(err) {
    // this.toastr.error(err.message, 'Error');
    this.submitting = false;
    this.error = true;
  }

  resetForm() {
    this.signupForm.reset();
  }

}
