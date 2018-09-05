import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router) { }

  class;
  students:any =[{rollno:'SP14-BSE-088', name:'Moeid Saleem Khan'}];


  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getClass(id);
    console.log(id); 
  }

  getClass(id){
     this.api.getClass(id).subscribe(res=>{
       console.log(res);
       this.class =res;

     })
  }

}
