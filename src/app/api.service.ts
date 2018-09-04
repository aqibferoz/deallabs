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
  loginAdmin(email, pass){
    return this.fbAuth.auth.signInWithEmailAndPassword(email,pass)
  }
  loginTeacher(email, pass){
    return this.fbAuth.auth.signInWithEmailAndPassword(email,pass)
  }


  //~ SIGNUP
  signupTeacher(email, pass){
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
  signupAdmin(email, pass){
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
  signupDoctor(email, pass){
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
  signupGuardian(email, pass){
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
  signupWorker(email, pass){
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }


  // FETCH Functiosn
  getAdminProfile(adminId){
    return this.afs.doc('admin/'+adminId).valueChanges();
  }
  getTeacherProfile(id){
    return this.afs.doc('teachers/'+id).valueChanges();

  }
  updateAdminProfile(adminId,data){
    return this.afs.doc('admin/'+adminId).update(data);
  }
  updateTeacherProfile(id,data){
    return this.afs.doc('teachers/'+id).update(data);
  }
  addProfile(id,data){
    return this.afs.doc('admin/'+id).set(data)
  }
  addTeacherProfile(id, data){
    return this.afs.doc('teachers/'+id).set(data);
  }


/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: CLASSES  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
 
addVaccine(data){
  return this.afs.collection('classes').add(data)
}
//~ CREATE 
addClass(data){
  return this.afs.collection('classes').add(data)
}
//~ READ 
getVaccines(){
  return this.afs.collection('vaccines').snapshotChanges();
}
getClasses(teacherId){
  return this.afs.collection('classes', ref=> ref.where('teacherId','==',teacherId)).snapshotChanges();
}
getClass(classId){
  return this.afs.doc('classes/'+classId).valueChanges();
}
//~ UPDATE 
updateVaccine(id, data){
  return this.afs.doc('vaccines/'+id).update(data);
}
updateClass(id,data){
  return this.afs.doc('classes/'+id).update(data);

}
//~ DELETE 
deleteVaccine(id){
  return this.afs.doc('vaccines/'+id).delete();
}
deleteClass(id){
  return this.afs.doc('classes/'+id).delete();
}

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: DOCTORS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
 
//~ CREATE 
addDoctor(data){
  return this.signupDoctor(data.email, data.password).then(resp=>{
    data.uid = resp.user.uid;
  return this.afs.doc('doctors/'+data.uid).set(data)
  })
}
//~ READ 
getDoctors(){
  return this.afs.collection('doctors').snapshotChanges();
}
//~ READ Single 
getDoctor(id){
  return this.afs.doc('doctors/'+id).snapshotChanges();
}
//~ UPDATE 
updateDoctor(id, data){
  return this.afs.doc('doctors/'+id).update(data);
}
//~ DELETE 
deleteDoctor(id){
  return this.afs.doc('doctors/'+id).delete();
}


/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: GUARDIAN  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
 
//~ CREATE 
addGuardian(data){
  return this.signupGuardian(data.email, data.password).then(resp=>{
    console.log(` ID is ${resp.user.uid}`)
    data.uid = resp.user.uid;
    return this.afs.doc('guardians/'+resp.user.uid).set(data)

  })

}
//~ READ 
getGuardians(){
  return this.afs.collection('guardians').snapshotChanges();

}
//~ UPDATE 
updateGuardian(id, data){
  return this.afs.doc('guardians/'+id).update(data);

}
//~ DELETE 
deleteGuardian(id){
  return this.afs.doc('guardians/'+id).delete();

}



/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: WORKERS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
 
//~ CREATE 
addWorker(data){
  return this.signupGuardian(data.email, data.password).then(resp=>{
    data.uid = resp.user.uid;
  return this.afs.doc('workers/'+data.uid).set(data)
  })

}
//~ READ 
getWorkers(){
  return this.afs.collection('workers').snapshotChanges();
}
//~ UPDATE 
updateWorker(id, data){
  return this.afs.doc('workers/'+id).update(data);

}
//~ DELETE 
deleteWorker(id){
  return this.afs.doc('workers/'+id).delete();
}


/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: WORKERS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

//~CREATE 
addChildren(data){
  return this.afs.collection('children').add(data);
}
//~READ 
getAllChildren(){
  return this.afs.collection('children').snapshotChanges();
}
getChildren(parentId){
  return this.afs.collection('children', ref=> ref.where('guardianId','==',parentId)).snapshotChanges();
}
//~UPDATE
updateChildren(id,data){
  return this.afs.doc('children/'+id).update(data);
}
deleteChildren(id){
  return this.afs.doc('children/'+id).delete();
}

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: WORKERS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */


getCampaigns(){
  return this.afs.collection('campaign').snapshotChanges();
}
addCampaign(data){
  return this.afs.collection('campaign').add(data);
}
deleteCampaign(id){
  return this.afs.doc('campaign/'+id).delete();
}
updateCampaign(id,data){
  return this.afs.doc('campaign/'+id).update(data);
}

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: NOTFICATIONS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */


// ~ CREATE
generateNotification(not){ /* type,message,date, priority(low,medium, high),  */
  return this.afs.collection('notifications').add(not);
}

// ~ READ
getAllNotifications(){
  return this.afs.collection('notifications').snapshotChanges();
}
getNotificationsById(id){
  return this.afs.collection('notifications', ref=>ref.where('userId','==',id)).snapshotChanges();
}
getNotificationsByType(type){  /* type==> | 'specific' | 'global' | */
  return this.afs.collection('notifications', ref=>ref.where('type','==',type)).snapshotChanges();
}

// ~ DELETE
deleteNotification(notificationId){
  return this.afs.doc('notifications/'+notificationId).delete();
}

updateNotification(notificationId,data){
  return this.afs.doc('notifications/'+notificationId).update(data);
}




// QUERIES 

saveQuery(data){
  return this.afs.collection('queries').add(data);

}

getQueries(){
  return this.afs.collection('queries').snapshotChanges();
}



//FAQs 
getFAQS(){
  return this.afs.collection('faqs').snapshotChanges();
}
/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: STATISTICS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */


getChildrenStat(type){
  return this.afs.collection('children', ref=> ref.where('status','==',type)).valueChanges();
}

}