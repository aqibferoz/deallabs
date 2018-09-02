import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user={
    email:'khushboohussain77@gmail.com',
    password:'polio123'
  }
error;  
correct={
  email:'khushboohussain77@gmail.com',
  password:'polio123'
}


  constructor(private router:Router, private api:ApiService) { }

  ngOnInit() {
  }



  login(){
    this.api.loginAdmin(this.user.email, this.user.password).then(response=>{
      this.error ='';
      this.api.adminId = response.user.uid;
      this.api.admin = response;
      localStorage.setItem('uid',response.user.uid);
      this.router.navigate(['dashboard']);
    }, err=>{
      this.error ='ERROR:'+err;
      setTimeout(()=>{
        this.error;
      },5000)

    })
    // if(this.user.email=='moeidsaleem@gmail.com' && this.user.password == 'moeid123' ){
    //   this.error=''
    //   console.log(this.user);
    //   this.router.navigate(['dashboard'])
    // }else{
    //   this.error='Incorrect Credentials.'
    //   setTimeout(()=>{
    //     this.error;
    //   },5000)

    // }

  }

  

}
