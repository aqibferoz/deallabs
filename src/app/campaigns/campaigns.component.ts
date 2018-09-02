import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import 'rxjs/add/operator/map';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent  implements OnInit {

  campaigns
  guardians;
   workers;
   doctors;
   vaccination;
   selectedCampaign;
   selectedVaccination;
   selectedWorker;
   children;
   childAddToggle=true;
   selectedChild;
 
   xxx=''
   order: string = 'name';
 
 
 
   
   constructor(private api: ApiService) {
    }
 
   ngOnInit() {    
     this.api.getVaccines().map(actions => {
       return actions.map(a => {
         const data = a.payload.doc.data()
         const id = a.payload.doc.id;
         return { id, ...data };
       })
     }).subscribe(vacc=>{
       this.vaccination =vacc;
     });
     this.api.getCampaigns().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }).subscribe(campaigns=>{
      this.campaigns =campaigns;
    });
     this.api.getWorkers().map(actions => {
       return actions.map(a => {
         const data = a.payload.doc.data()
         const id = a.payload.doc.id;
         return { id, ...data };
       })
     }).subscribe(worker=>{
       this.workers =worker;
     })
 
   }
 
 
   submit(val){
     $('#exampleModal').modal('hide')
    //  val. = new Date().getUTCDate();
    val.totalWorkers =0;
    if(this.selectedVaccination){
      val.vaccination = this.selectedVaccination;
      // val.vaccination.id =this.selectedVaccination.id;
     }
     val.workers =[];
     console.log(val);
     this.api.addCampaign(val).then(res=>{
       console.log('campaign added')
     },err=>{
       console.log(err);
     })
   }
 
   delete(camp){
     $('#deleteModal').modal('hide');
     //now removing the campaign
     this.api.deleteCampaign(this.selectedCampaign.id).then(res=>{
      this.selectedCampaign ={};
      this.selectedVaccination ={};
      console.log(`deleted`);
     }, err=>{})
   }

   updateCampaign(){
    $('#editModal').modal('hide');
    this.api.updateCampaign(this.selectedCampaign.id, this.selectedCampaign).then(resp=>{
      this.selectedCampaign ={}
    })
   }

   update(data){
     $('#editModal').modal('hide');
     this.api.updateGuardian(data.id, data).then(res=>{
       this.selectedWorker ={};
       this.selectedCampaign ={};
     })
   }

   updateVaccine(selectedVaccine){
    $('#vaccineModal').modal('hide')
    console.log(selectedVaccine);
    this.api.updateCampaign(this.selectedCampaign.id, {vaccination: this.selectedVaccination}).then(res=>{
      console.log('vaccine  updated!')


    },err=>{
      console.log(err);
    })

  }
 
 
   updateWorker(){
     console.log(this.selectedCampaign);
     if(this.selectedCampaign){
     $('#updateWorkerModal').modal('hide');
     this.api.updateCampaign(this.selectedCampaign.id, this.selectedCampaign).then(res=>{
      //  this.selectedCampaign ={};
      //  this.selectedWorker ={};
     });
   }else{
     console.log('no change');
     $('#updateWorkerModal').modal('hide');
 
   }
   
 
   }
   loadWorkers(id){
     //load children of a certain guardian meaning this guardian 
     this.api.getWorkers().map(actions => {
       return actions.map(a => {
         const data = a.payload.doc.data()
         const id = a.payload.doc.id;
         return { id, ...data };
       })
     }).subscribe(workers=>{
       this.workers = workers;
     })
   }
 
   addChild(data){
     data.guardianName = this.selectedCampaign.name;
     data.guardianId = this.selectedCampaign.id;
     console.log(data);
     this.childAddToggle= !this.childAddToggle;
 
     this.api.addChildren(data).then(res=>{
       this.selectedCampaign.totalChildren++;
       this.api.updateGuardian(this.selectedCampaign.id, { totalChildren:this.selectedCampaign.totalChildren}).then(resp=>{
         console.log('guardian child updated');
       })
     });
 
   }
   deleteChild(id){
     return this.api.deleteChildren(id).then(rex=>{
       console.log('child removed');
       this.selectedCampaign.totalChildren--;
       this.api.updateGuardian(this.selectedCampaign.id, { totalChildren:this.selectedCampaign.totalChildren}).then(resp=>{
         console.log('guardian child updated');
 
       })
       
     })
   }
   updateChild(data){
     this.api.updateChildren(data.id, data).then(resp=>{
       $('#updateChildModal').modal('hide');
 
 
     })
   }
 
   onChange(e){
     let obj=JSON.parse(e)
     console.log(obj);
     this.selectedVaccination = obj;
    //       console.log(this.selectedVaccination);
   }
   onChangeWorker(e){
     let obj = JSON.parse(e);
     this.selectedCampaign.workers.push(obj);
     console.log(this.selectedCampaign);
   
     

   }
 
 
   orderBy(value){
     this.order = value;
   }

   deleteSelectedWorker(index){
    this.selectedCampaign.workers.splice(index,1);
    if(this.selectedCampaign){
      this.api.updateCampaign(this.selectedCampaign.id, this.selectedCampaign).then(res=>{
       //  this.selectedCampaign ={};
       //  this.selectedWorker ={};
      });
    }
 
 }




}
 