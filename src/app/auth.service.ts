import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth, private afs:AngularFirestore) { }




  loginTeacher(email, password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUpTeacher(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  createTeacher(uid, data){
     //if uid then sabve data 
     this.afs.doc('teachers/'+uid).set(data)

  }



  saveLocalData(uid){
     localStorage.setItem('uid', uid);
  }


}
