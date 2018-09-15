import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class ApiService {
admin;
adminId;
  constructor(private afs:AngularFirestore,private fbAuth:AngularFireAuth) { 
    console.log(localStorage.getItem('uid'));
    this.adminId =localStorage.getItem('uid')
    
  
  }



  /* """"""""""""""""""""""""""""""""""""""""""""   AUTHENTICATION   """""""""""""""""""""""""""""""""""""""""""""""""""*/

  //~ LOGIN 
  loginTeacher(email, pass){
    return this.fbAuth.auth.signInWithEmailAndPassword(email,pass)
  }


  //~ SIGNUP
  signupTeacher(email, pass){
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }



/* :::::::::::::::::::::::::::::::::::::::: TEACHER  :::::::::::::::::::::::::::::::::::: */

  getTeacherProfile(id){
    return this.afs.doc('teachers/'+id).valueChanges();

  }
  
  updateTeacherProfile(id,data){
    return this.afs.doc('teachers/'+id).update(data);
  }
  addTeacherProfile(id, data){
    return this.afs.doc('teachers/'+id).set(data);
  }

getTeachers(){
  return this.afs.collection('teachers').snapshotChanges();
}
/* ::::::::::::::::::::::::::::: CLASSES  :::::::::::::::::::::::::::::::::::: */
 
//~ CREATE 
addClass(data){
  return this.afs.collection('classes').add(data)
}
//~ READ 

getClasses(teacherId){
  return this.afs.collection('classes', ref=> ref.where('teacherId','==',teacherId)).snapshotChanges();
}
getClass(classId){
  return this.afs.doc('classes/'+classId).valueChanges();
}
//~ UPDATE 
updateClass(id,data){
  return this.afs.doc('classes/'+id).update(data);
}
//~ DELETE 
deleteClass(id){
  return this.afs.doc('classes/'+id).delete();
}

getClassStudents(classId){
  return this.afs.collection('student-class', ref=>ref.where('classId','==',classId)).snapshotChanges();
}



/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: ASSIGNMENTS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
 
//~ CREATE 
addAssigment(data){
  return this.afs.collection('assignments').add(data);
}
//~ READ 
getAllAssigments(){
  return this.afs.collection('assignments').snapshotChanges();
}
getAssigments(classId){
  return this.afs.collection('assignments', ref=> ref.where('classId','==',classId)).snapshotChanges();
}
//~ READ Single 
getAssigment(id){
  return this.afs.doc('assignments/'+id).snapshotChanges();
}
//~ UPDATE 
updateAssigment(id,data){
  return this.afs.doc('assignments/'+id).update(data);
}
//~ DELETE 
deleteAssigment(id){
  return this.afs.doc('assignments/'+id).delete();
}

uploadedAssignments(assignmentId){
  return this.afs.collection('uploads', ref=>ref.where('type','==','assignment').where('typeId','==',assignmentId)).snapshotChanges();
}





/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: QUIZES  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

//~ CREATE 
addQuiz(data){
  return this.afs.collection('quizes').add(data);
}
//~ READ 
getAllQuizes(){
  return this.afs.collection('quizes').snapshotChanges();
}
getQuizes(classId){
  return this.afs.collection('quizes', ref=> ref.where('classId','==',classId)).snapshotChanges();
}
//~ READ Single 
getQuiz(id){
  return this.afs.doc('quizes/'+id).snapshotChanges();
}
//~ UPDATE 
updateQuiz(id,data){
  return this.afs.doc('quizes/'+id).update(data);
}
//~ DELETE 
deleteQuiz(id){
  return this.afs.doc('quizes/'+id).delete();
}
uploadedQuizes(quizId){
  /* will have marks, */
  return this.afs.collection('uploads', ref=>ref.where('type','==','quiz').where('typeId','==',quizId)).snapshotChanges();

}



}