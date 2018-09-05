import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router) { }

  class;
  students:any =[{rollno:'SP14-BSE-088', name:'Moeid Saleem Khan'}];
  classId;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.classId = id;
    this.getClass(id);
    console.log(id); 
    this.getAssigments();
  }

  getClass(id){
     this.api.getClass(id).subscribe(res=>{
       console.log(res);
       this.class =res;

     })
  }

  assigments;
  getAssigments(){
    this.api.getAssigments(this.classId).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })

    }).subscribe(resp=>{
      this.assigments =resp;
    })
  }



  // Assigment
  submit(val){
    $('#exampleModal').modal('hide')

    console.log(val);
    val.startDate = new Date().getUTCDate();
    val.classId = this.classId;

    this.api.addAssigment(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }
}
