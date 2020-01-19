import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ApplayoutComponent } from './applayout/applayout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HotelsListComponent } from './modules/hotels/hotels-list/hotels-list.component';
import { FlightsListComponent } from './modules/flights/flights-list/flights-list.component';
import { UsersListComponent } from './modules/users/users-list/users-list.component';
import { GroupsListComponent } from './modules/groups/groups-list/groups-list.component';
import { BagsListComponent } from './modules/bags/bags-list/bags-list.component';
import { VendorsListComponent } from './modules/vendors/vendors-list/vendors-list.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HotelsDataComponent } from './modules/hotels/hotels-data/hotels-data.component';
import { FlightsDataComponent } from './modules/flights/flights-data/flights-data.component';
import { UsersDataComponent } from './modules/users/users-data/users-data.component';
import { VendorsDataComponent } from './modules/vendors/vendors-data/vendors-data.component';
import { BagsDataComponent } from './modules/bags/bags-data/bags-data.component';
import { GroupDataComponent } from './modules/groups/group-data/group-data.component';
import { BasicAuthInterceptor } from './interceptor';
import { SearchPipe } from './search.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ApplayoutComponent,
    DashboardComponent,
    
    LoginComponent,
    HotelsListComponent,
    FlightsListComponent,
    UsersListComponent,
    GroupsListComponent,
    BagsListComponent,
    VendorsListComponent,
    HotelsDataComponent,
    FlightsDataComponent,
    UsersDataComponent,
    VendorsDataComponent,
    BagsDataComponent,
    GroupDataComponent,
    SearchPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    NgSelectModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
