import { Route } from "@angular/router";
import { Register } from "./components/register/register";
import { Login } from "./components/login/login";

export const RegisterRoute : Route[] = [
  {path:'',component:Register}
];

export const LoginRoute : Route[] = [
  {path:'',component:Login}
]

