

import { Component, OnInit,  } from '@angular/core';
import { ApiService } from '../api.service';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {


  vaccines;
  selectedVaccine;


  xxx=''
  order: string = 'name';



  
  constructor(private api: ApiService,private router:Router) {
   }

  ngOnInit() {    
    let uid = localStorage.getItem('uid');
    this.api.getClasses(uid).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }).subscribe(resp=>{
      console.log(resp);
      this.vaccines =resp;
    })

  }
  details(c){
    console.log(c);
    this.router.navigate([`/dashboard/classes/${c.id}`]);
  }

  submit(val){
    $('#exampleModal').modal('hide');

    let uid= localStorage.getItem('uid');
    val.teacherId = uid;
    console.log(val);
    this.api.addClass(val).then(res=>{
    },err=>{
      console.log(err);
    });
  }

  delete(vaccine){
    $('#deleteModal').modal('hide');
    this.selectedVaccine ={};
    //now removing the vaccine
    this.api.deleteVaccine(vaccine.id).then(res=>{

    }, err=>{})
  }

  update(data){
    $('#editModal').modal('hide');
    this.api.updateVaccine(data.id, data).then(res=>{

      this.selectedVaccine ={};


    })
  }



  orderBy(value){
    this.order = value;
  }

}
