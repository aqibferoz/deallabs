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


  influencerData={
    first:'',
    last:'',
    email :'' ,
    userId:'',
    city:'',
    country: '',
    postalcode:''
   }


  admin;
  uid: string;
  influencer: {};
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {

    


    this.api.getTeacherProfile(localStorage.getItem('uid')).subscribe(resp=>{
      this.admin =resp;
      console.log(resp);
    });
  }

  createInfluencer(){
    let data = {
      first : this.influencerData.first,
      last: this.influencerData.last,
      influencerid : localStorage.getItem('uid'),
      email: this.influencerData.email,
      city: this.influencerData.city,
      country: this.influencerData.country,
      postalcode: this.influencerData.postalcode,
      userId: this.influencerData.userId
    }
  
    this.api.createInfluencer(data).then(res=>{
      console.log('Influencer created')
    }
      ,err=>{
      console.log(`error found`)
    })
    // this.router.navigate(['']);
  }
  
  getInfl(){
    this.uid = localStorage.getItem('uid');
    console.log(this.uid);
    this.api.getInfluencer(this.uid).subscribe(res=>{
      this.influencer = res;
    })
  
  }


  // updateProfile(){
  //   this.api.updateTeacherProfile(this.api.adminId, this.admin).then(resp=>{
  //     console.log('Teacher Updated');
  //     alert(`Teacher profile updated`)
  //   })
  // }

  // logOut(){
  //   localStorage.removeItem('uid');
  //   this.router.navigate(['/landing'])
    
  // }

}
