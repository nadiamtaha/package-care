import { GroupDataComponent } from './modules/groups/group-data/group-data.component';
import { BagsDataComponent } from './modules/bags/bags-data/bags-data.component';
import { UsersDataComponent } from './modules/users/users-data/users-data.component';
import { FlightsDataComponent } from './modules/flights/flights-data/flights-data.component';
import { HotelsDataComponent } from './modules/hotels/hotels-data/hotels-data.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplayoutComponent } from './applayout/applayout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HotelsListComponent } from './modules/hotels/hotels-list/hotels-list.component';
import { FlightsListComponent } from './modules/flights/flights-list/flights-list.component';
import { UsersListComponent } from './modules/users/users-list/users-list.component';
import { GroupsListComponent } from './modules/groups/groups-list/groups-list.component';
import { BagsListComponent } from './modules/bags/bags-list/bags-list.component';
import { VendorsListComponent } from './modules/vendors/vendors-list/vendors-list.component';
import { VendorsDataComponent } from './modules/vendors/vendors-data/vendors-data.component';


export const routes: Routes = [
  { 
     path: 'layout',
     component: ApplayoutComponent, 
     children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'hotels', component: HotelsListComponent },
            { path: 'flights', component: FlightsListComponent },
            { path: 'users', component: UsersListComponent },
            { path: 'groups', component: GroupsListComponent },
            { path: 'bags', component: BagsListComponent },
            { path: 'vendors', component: VendorsListComponent },
            { path: 'add-Hotel', component: HotelsDataComponent },
            { path: 'hotel/:id', component: HotelsDataComponent },
            { path: 'add-flight', component: FlightsDataComponent },
            { path: 'flight/:id', component: FlightsDataComponent },
            { path: 'add-user', component: UsersDataComponent },
            { path: 'user/:id', component: UsersDataComponent },
            { path: 'add-vendor', component: VendorsDataComponent },
            { path: 'vendor/:id', component: VendorsDataComponent },
            { path: 'bag/:id', component: BagsDataComponent },
            { path: 'group/:id', component: GroupDataComponent },

            
            
            

          ]
  },
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: '**', component: LoginComponent},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
