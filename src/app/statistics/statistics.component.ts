import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private api:ApiService) { }


  vaccinated;
  uninterested;
  pending;
  total_children;
  chartData;
  chartLabels;





  doctors;
  workers;
  guardians;
  children;
  vaccines;

  ngOnInit() {
    this.api.getChildrenStat('vaccinated').subscribe(resp=>{
      this.vaccinated =resp.length;
      this.api.getChildrenStat('pending').subscribe(pending=>{
        this.pending = pending.length;
        this.api.getChildrenStat('uninterested').subscribe(un=>{
        this.uninterested = un.length;
        this.chartData =[this.vaccinated, this.pending, this.uninterested];
        this.chartLabels =['Vaccinated','Pending','Un-interested'];
        console.log(this.chartData);
        
        })
      })

    });

    this.api.getDoctors().subscribe(resp=>{
      this.doctors = resp.length;
    });
    this.api.getAllChildren().subscribe(respx=>{
      this.children =respx.length;
    });
    this.api.getVaccines().subscribe(respxx=>{
      this.vaccines = respxx.length;
    });
    this.api.getWorkers().subscribe(workersx=>{
      this.workers = workersx.length;
    })
    this.api.getGuardians().subscribe(guard=>{
      this.guardians =guard.length;
    })
  }




  




  chartOptions = {
    responsive: true
  };

  // chartData = [
  //   { data: [330, 600, 260, 700], label: 'Account A' },
  //   { data: [120, 455, 100, 340], label: 'Account B' },
  //   { data: [45, 67, 800, 500], label: 'Account C' }
  // ];

  // chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Vaccinated'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Non-vaccinated'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';
 







}
