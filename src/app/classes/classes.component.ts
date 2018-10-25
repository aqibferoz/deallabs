

import { Component, OnInit,  } from '@angular/core';
import { ApiService } from '../api.service';

import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs-compat/operator/map';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  dealsData={
    title:'',
    description:'',
    link:'' ,
    category:'',
    start:'',
    endate:'',
    userId:''
   }
   selectedClass
  admin;
  uid: string;
  deals: {};
  deal:any;
  constructor(private api:ApiService,private router:Router,private afs:AngularFirestore) { }

  ngOnInit() {

    this.api.getTeacherProfile(localStorage.getItem('uid')).subscribe(resp=>{
      this.admin =resp;
      console.log(resp);
    });

    this.getDeals();
  }

  createdeal(){
    let data = {
      title : this.dealsData.title,
      description: this.dealsData.description,
      influencerid : localStorage.getItem('uid'),
      link: this.dealsData.link,
      category: this.dealsData.category,
      start: this.dealsData.start,
      endate: this.dealsData.endate,
      userId: this.dealsData.userId
    }
  
    this.api.createDeal(data).then(res=>{
      console.log('deal created')
    }
      ,err=>{
      console.log(`error found`)
    })
  }



  
  getDeals(){
      this.uid = localStorage.getItem('uid');
      console.log(this.uid);
      this.api.gettingDeals().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data(); 
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      }).subscribe(resp=>{
        console.log(resp);
        this.deals =resp;
      })
    
    }
  
    updateDeals(id, data){
      console.log(this.deal.id);
      console.log(data);
      return this.api.updateDeal(id,data).then(res=>{
        console.log('deals updated');
      $('#editModal').hide();
      this.deal = {}
      })

      }



      //this function populates
      getDeal(uid){
        console.log(uid)
        this.api.getDeal(this.uid)
     .subscribe(res =>{
       console.log(res)
      //now we will bind the data to the ngMOdel 
       this.deal =  res;  
      })
     
    }

    deleteDeal(id){
      return this.api.deleteDeal(id).then(res=>{
        console.log('deal deleted');
      })
    }





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
