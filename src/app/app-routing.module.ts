import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout.component';
import { LatestJobsComponent } from './latest-jobs/latest-jobs.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'technologies', loadChildren: 'app/technologies/technologies.module#TechnologiesModule'
    },
    {
        path: 'latest-jobs', component: LatestJobsComponent
    },
    {
        path: 'logout', component: LogoutComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }