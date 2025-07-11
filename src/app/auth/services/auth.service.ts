import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { map, Observable } from "rxjs";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn:'root'  
})
export class AuthService{

    constructor(private http : HttpClient){

    }

    register(data : RegisterRequestInterface) : Observable<CurrentUserInterface>{
        debugger
        const url =environment.apiUrl + '/Register'

        return this.http.post<any>(url,data).pipe(map((response) => response))
    }
}