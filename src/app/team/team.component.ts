import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {


  workers;
  doctors;
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.api.getTeachers().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }).subscribe(doc=>{
      this.doctors = doc;
      
    });
    // this.api.getWorkers().map(actions => {
    //   return actions.map(a => {
    //     const data = a.payload.doc.data()
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   })
    // }).subscribe(worker=>{
    //   this.workers = worker;
      
    // });
  }


  

}
