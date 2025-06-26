import { Component, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { authActions } from "../../store/actions";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { RouterLink } from "@angular/router";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducer";
import { AuthStateInterface } from "../../types/authState.interface";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { combineLatest } from "rxjs";
import { BackendErrorMessages } from "../../../shared/components/backendErrorMessages/backend-error-messages/backend-error-messages";

@Component({
    selector : 'mc-register',
    templateUrl : './register.component.html',
    standalone : true,
    imports:[ReactiveFormsModule,RouterLink,CommonModule,BackendErrorMessages]
})

export class RegisterComponent implements OnInit{

    form = this.fb.nonNullable.group({
        username : ['',Validators.required],
        email : ['',Validators.required],
        password : ['',Validators.required]
    })

    data$ = combineLatest({
        isSubmitting : this.store.select(selectIsSubmitting),
        backendError : this.store.select(selectValidationErrors)
    })

    constructor(private fb : FormBuilder,private store : Store){

    }
    ngOnInit(): void {
        
    }
    onSubmit(){
        console.log('form ' ,this.form.getRawValue())
        const request : RegisterRequestInterface = {
            user : this.form.getRawValue(),
        }
        this.store.dispatch(authActions.register({request}))
    }
}