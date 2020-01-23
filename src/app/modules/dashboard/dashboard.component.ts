import { Component, OnInit } from '@angular/core';
import { DashboardStatisticsService } from './dashboard-statistics.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from  '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentDate=new Date();
  todayDate:any;
  GroupsCount: 0
  FlightsCount: 0
  BagsCount: 0
  NewBagsCount: 0
  ShippedBagsCount: 0
  InVanBagsCount: 0
  ReceivedBagsCount: 0
  DeliveredBagsCount: 0
  OutForDeliveryBagsCount: 0
  constructor(private _DashboardStatisticsService:DashboardStatisticsService,
    private spinner: NgxSpinnerService,private router:Router) {
   this.todayDate = this.formatDate(this.currentDate);
   console.log(this.todayDate)

  }
  
  public doughnutChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    cutoutPercentage:87,
    backgroundColor: 'red'

  };
  public doughnutChartGroupsColors: Array<any> = [
    {
      backgroundColor: [
        '#FEBA69',
        '#fff',
      ]
    }
  ]
  public doughnutChartFlightsColors: Array<any> = [
    {
      backgroundColor: [
        '#23E495',
        '#fff',
      ]
    }
  ]
  public doughnutChartLabels = ['2006','444'];
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = true;
  
  dashboardData:any;

  public polarChartType: string = 'polarArea';

  public polarChartDatasets: Array<any> = [];

  public polarChartLabels: Array<any> = ['New', 'Shipped','In Van', 'Received','Delivered','Out Of Delivery'];

  public polarChartColors: Array<any> = [
    {
      backgroundColor: [
        '#92D4FE',
        '#FFE970',
        '#FDAE4E',
        '#51DBB4',
        '#F7ACAC',
        '#9FA4E5'
      ],
      hoverBackgroundColor: [
        'rgba(219, 0, 0, 0.2)',
        'rgba(0, 165, 2, 0.2)',
        'rgba(255, 195, 15, 0.3)',
        'rgba(55, 59, 66, 0.1)',
        'rgba(0, 0, 0, 0.4)',
        'rgba(0, 165, 2, 0.2)'
      ],
      borderWidth: 2,
    }
  ];

  public polarChartOptions: any = {
    responsive: true
  };
  public polarChartClicked(e: any): void { }
  public polarChartHovered(e: any): void { }

  public barChartType: string = 'bar';

  public barChartDatasets: Array<any> = [];
  public doughnutChartGroupsData: Array<any> = [];
  public doughnutChartFlightsData : Array<any> = [];
  public barChartLabels: Array<any> = ['New', 'Shipped','In Van', 'Received','Delivered','Out Of Delivery'];

  public barChartColors: Array<any> = [
    { backgroundColor: '#364148' },
    { backgroundColor: '#687F8D' },
   
  ];

  public barChartOptions: any = {
    responsive: true
  };
  public barChartClicked(e: any): void { }
  public barChartHovered(e: any): void { }

  ngOnInit() {
    if(!localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.spinner.show();

this.getStatisticalByDay(this.currentDate)
  }

  getStatisticalByDay(current){
    this._DashboardStatisticsService.getDashboardStatistical(current).subscribe(response=>{
      this.spinner.hide();

      this.dashboardData=response.Data;
      this.barChartDatasets= [
        // { data: [this.dashboardData.NewBagsCount, this.dashboardData.ShippedBagsCount, this.dashboardData.InVanBagsCount, this.dashboardData.ReceivedBagsCount, this.dashboardData.DeliveredBagsCount, this.dashboardData.OutForDeliveryBagsCount], label: 'Scanned BAGS' },
        // { data: [this.dashboardData.NewBagsCount, this.dashboardData.ShippedBagsCount, this.dashboardData.InVanBagsCount, this.dashboardData.ReceivedBagsCount, this.dashboardData.DeliveredBagsCount, this.dashboardData.OutForDeliveryBagsCount], label: 'Not Scanned BAGS' }
        { data: [20, 80, 25, 35, 24, 30], label: 'Scanned' },
        { data: [50, 40, 15, 60, 30, 12], label: 'Not Scanned' }

      ];
     this.polarChartDatasets=[
      { data: [this.dashboardData.NewBagsCount, this.dashboardData.ShippedBagsCount, this.dashboardData.InVanBagsCount, this.dashboardData.ReceivedBagsCount, this.dashboardData.DeliveredBagsCount, this.dashboardData.OutForDeliveryBagsCount], label: 'Scanned & Not Scanned BAGS' }
    ]
    var sumRemainingDataExceptFlights=this.dashboardData.GroupsCount+this.dashboardData.NewBagsCount+ this.dashboardData.ShippedBagsCount+this.dashboardData.InVanBagsCount+this.dashboardData.ReceivedBagsCount+this.dashboardData.DeliveredBagsCount+this.dashboardData.OutForDeliveryBagsCount
    var sumRemainingDataExceptGroups=this.dashboardData.FlightsCount+this.dashboardData.NewBagsCount+ this.dashboardData.ShippedBagsCount+this.dashboardData.InVanBagsCount+this.dashboardData.ReceivedBagsCount+this.dashboardData.DeliveredBagsCount+this.dashboardData.OutForDeliveryBagsCount

    this.doughnutChartFlightsData = [
      {data: [this.dashboardData.FlightsCount,sumRemainingDataExceptFlights], label: 'Flights'}
    ];
    this.doughnutChartGroupsData = [
      {data: [this.dashboardData.GroupsCount,sumRemainingDataExceptGroups], label: 'Groups'}
    ];
      console.log(this.dashboardData)
    })
    
  }
  formatDate(date) {
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
    var d = new Date(date),
        month = '' + (monthNames[d.getMonth()] ),
        day = '' + d.getDate(),
        year = d.getFullYear();
       
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day,month,year].join('-');
}
getNewDate(pickedDate){
  this.getStatisticalByDay(pickedDate)

}
}
