import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';

//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { VaccinesComponent } from './vaccines/vaccines.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { GuardiansComponent } from './guardians/guardians.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkersComponent } from './workers/workers.component';
import { ApiService } from './api.service';


//extenals
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { ChartsModule } from 'ng2-charts';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TeamComponent } from './team/team.component';
import { QueriesComponent } from './queries/queries.component';
import { ComplainComponent } from './complain/complain.component';
import { AboutComponent } from './about/about.component';
import { ClassesComponent } from './classes/classes.component';
import { SettingComponent } from './setting/setting.component';
import { HelpComponent } from './help/help.component';




let ROUTES =[
  {path:'', redirectTo:'landing', pathMatch:'full'},
  {path:'landing', component:LandingComponent},
  {path:'statistics', component:StatisticsComponent},
  {path:'complains', component:ComplainComponent},
  {path:'team', component:TeamComponent},
  {path:'about', component:AboutComponent },
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent, children:[
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'profile', component:ProfileComponent},
    {path:'vaccines', component:VaccinesComponent},
    {path:'doctors', component:DoctorsComponent},
    {path:'guardians', component:GuardiansComponent},
    {path:'workers', component:WorkersComponent},
    {path:'campaigns', component:CampaignsComponent},
    {path:'notifications', component:NotificationsComponent},
    {path:'queries', component:QueriesComponent},
    //real ones
    { path: 'classes', component: ClassesComponent},
    { path: 'setting', component: SettingComponent},
    { path: 'help', component: HelpComponent},


  ]},
  


]

let firebaseConfig= {
  apiKey: "AIzaSyB529CKeEX6S_wTIGCdxpnvfK0v4x0Z7VQ",
  authDomain: "polio-management.firebaseapp.com",
  databaseURL: "https://polio-management.firebaseio.com",
  projectId: "polio-management",
  storageBucket: "",
  messagingSenderId: "689787945890"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HomeComponent,
    VaccinesComponent,
    DoctorsComponent,
    GuardiansComponent,
    LandingComponent,
    FooterComponent,
    ProfileComponent,
    WorkersComponent,
    CampaignsComponent,
    NotificationsComponent,
    StatisticsComponent,
    TeamComponent,
    QueriesComponent,
    ComplainComponent,
    AboutComponent,
    //real ones
    ClassesComponent,
    SettingComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    Ng2SearchPipeModule,
    OrderModule,
    ChartsModule
    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
