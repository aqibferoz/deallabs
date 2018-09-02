import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  admin;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {

    


    this.api.getAdminProfile(localStorage.getItem('uid')).subscribe(resp=>{
      this.admin =resp;
      console.log(resp);
    });
  }

  updateProfile(){
    this.api.updateAdminProfile(this.api.adminId, this.admin).then(resp=>{
      console.log('admin Updated');
    })
  }

  logOut(){
    localStorage.removeItem('uid');
    this.router.navigate(['/landing'])
    
  }

}
