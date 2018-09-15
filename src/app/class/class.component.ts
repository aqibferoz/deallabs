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
  students;
  assigments;
  quizes;
  classId;
  selectedAssignment;
  selectedQuiz;
  showAddQuiz:boolean = false;
  question={
    question:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    correct:''
  }
  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.classId = id;
    this.getClass(id);
    console.log(id); 
    this.getAssigments();
    this.getQuizes();
    this.getStudents(this.classId);
  }


  //CLASS - READ
  getClass(id){
     this.api.getClass(id).subscribe(res=>{
       this.class =res;
     })
  }
  //CLASS - STUDENTS 
  getStudents(classId){
    this.api.getClassStudents(classId).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }).subscribe(resp=>{
      this.students =resp;
    })
  }



  //ASSIGMENT - READ

  getAssigments(){
    this.api.getAssigments(this.classId).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })

    }).subscribe(resp=>{
      console.log(resp);
      this.assigments =resp;
    })
  }
  // Assigment - ADD
  submitAssignment(val){
    $('#addAssignmentModal').modal('hide')
    console.log(val);
    val.startDate = new Date().getUTCDate();
    val.classId = this.classId;
    this.api.addAssigment(val).then(res=>{
    },err=>{ console.log(err) })
  }
  //ASSIGNMENT - DELETE
  deleteAssignment(data){
    $('#deleteAssignmentModal').modal('hide');
    this.selectedAssignment ={};
    //now removing the class
    this.api.deleteAssigment(data.id).then(res=>{
    }, err=>{})
  }
 //ASSIGNMENT - UPDATE
  updateAssignment(data){
    $('#editAssignmentModal').modal('hide');
    this.api.updateAssigment(data.id, data).then(res=>{

      this.selectedAssignment ={};
    });
  }

//ASSIGNMENT - UPLOAD DETAILS
  uploads=[]
  AssignmentDetails(id){
    $('#detailAssignmentModal').modal('show')
    this.api.uploadedAssignments(id).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      }) }).subscribe(res=>{
      console.log(res);
      this.uploads =res;
    })
  }
  leaveDetailAssignment(){
    this.uploads= [];
    $('#detailAssignmentModal').modal('show')
    console.log(this.uploads); 
  }




  /* :::::: QUIZ ::::::::: */


  
  //Quiz - GET

  getQuizes(){
    this.api.getQuizes(this.classId).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })

    }).subscribe(resp=>{
      this.quizes =resp;
    })
  }


  // Assigment - ADD
  submitQuiz(val){
    $('#addQuizModal').modal('hide')

    console.log(val);
    val.startDate = new Date().getUTCDate();
    val.classId = this.classId;

    this.api.addQuiz(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }


  deleteQuiz(data){
    $('#deleteQuizModal').modal('hide');
    this.selectedQuiz ={};
    //now removing the class
    this.api.deleteQuiz(data.id).then(res=>{
    }, err=>{})
  }


  updateQuiz(data){
    $('#editQuizModal').modal('hide');
    this.api.updateClass(data.id, data).then(res=>{
      this.selectedQuiz ={};
    });
  }

  //QUIZ - UPLOAD DETAILS
  quizDetails(id){
    $('#detailQuizModal').modal('show')
    this.api.uploadedQuizes(id).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      }) }).subscribe(res=>{
      console.log(res);
      this.uploads =res;
    })
  }
  leaveDetailQuiz(){
    this.uploads= [];
    $('#detailQuizModal').modal('show')
    console.log(this.uploads); 
  }

//QUIZ - Questions
addQuestion(){
  this.selectedQuiz.questions.push(this.question);
  this.question ={
    question:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    correct:''
  }
  this.showAddQuiz =false;
    
}
}
