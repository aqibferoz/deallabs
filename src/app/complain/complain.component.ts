import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {

  constructor(private api:ApiService) { }


  query={
    message:'',
    name:'',
    email:'',
    date:''
  }
  
  send(){
    let x = new Date().toLocaleDateString();
    this.query.date = x;
    if(this.query.message && this.query.email && this.query.name){
      this.api.saveQuery(this.query).then(r=>{
        this.query ={
          email:'',
          message:'',
          name:'',
          date:''
        };
        alert('Query sent to the adminstration! Thanks.');
        this.query ={
          message:'',
          name:'',
          email:'',
          date:''
        }
      })
    }else{
      alert('Please fill form data')
    }
  }




  sendQuery(){
    if(this.query.message && this.query.email){
      let x = new Date().toLocaleDateString();
      this.query.date = x;
      this.api.saveQuery(this.query).then(r=>{
        this.query ={
          email:'',
          message:'',
          name:'',
          date:''
        };
        alert('Query sent to the adminstration! Thanks.')
      })
    }


  }


  ngOnInit() {

  }

}
