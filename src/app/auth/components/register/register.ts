import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegisterRequestInterface } from '../../types/RegisterRequest.interface';
import { selectIsSubmitting } from '../../store/selectors';
import { AuthStateInterface } from '../../types/authState.interface';
import { AuthService } from '../../services/auth.service';
import { authActions } from '../../store/action';
import { selectValidationErrors } from '../../store/reducer';
import { combineLatest, interval, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackendErrorMessages } from '../../../shared/components/backendErrorMessages/backend-error-messages/backend-error-messages';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.css',
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
export class Register implements OnInit {

  form = this.fb.nonNullable.group({
    username:['',Validators.required],
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
    const request : RegisterRequestInterface = {
      user : this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({request}))
    this.authSvc.register(request).subscribe((res) => console.log('res ' , res));
  }
}
