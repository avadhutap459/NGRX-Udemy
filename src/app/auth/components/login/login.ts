import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting } from '../../store/selectors';
import { selectValidationErrors } from '../../store/reducer';
import { AuthStateInterface } from '../../types/authState.interface';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { RegisterRequestInterface } from '../../types/RegisterRequest.interface';
import { authActions } from '../../store/action';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackendErrorMessages } from '../../../shared/components/backendErrorMessages/backend-error-messages/backend-error-messages';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    BackendErrorMessages
  ],
  providers:[
    AuthService
  ]
})
export class Login implements OnInit {

  form = this.fb.nonNullable.group({
    email:['',Validators.required],
    password :['',Validators.required]
  })

data$= combineLatest({
  isSubmitting  : this.store.select(selectIsSubmitting),
  backendError : this.store.select(selectValidationErrors)
});

  constructor(
    private fb : FormBuilder,
    private store : Store<{auth : AuthStateInterface}>,
    private authSvc : AuthService
  ){  }

  ngOnInit(): void {
  }
 
  onSubmit(){

    console.log('form ' , this.form.getRawValue())
    const request : LoginRequestInterface = {
      user : this.form.getRawValue(),
    }
    this.store.dispatch(authActions.login({request}))
    this.authSvc.login(request).subscribe((res) => console.log('res ' , res));
  }
}
