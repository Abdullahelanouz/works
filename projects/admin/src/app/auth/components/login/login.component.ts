import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login } from '../../context/DTOs';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private service:LoginService, private toaster:ToastrService ,private router:Router) { }
  loginFrom!:FormGroup

  ngOnInit(): void {
    this.CreateForm()
  }
CreateForm(){
this.loginFrom=this.fb.group({
  email:["",[Validators.required,Validators.email]],
  password:["",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  role:['admin']
})
}
login() {
  this.service.login(this.loginFrom.value).subscribe(res=>{
 this.toaster.success("Success","login Sucess")
 this.router.navigate(['/tasks'])
  },error =>{
    this.toaster.error( error.error)

  })
    console.log(this.loginFrom.value);
}
}
