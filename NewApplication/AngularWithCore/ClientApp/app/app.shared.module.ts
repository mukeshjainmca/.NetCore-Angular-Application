import { NgModule } from '@angular/core';
import { MemberService } from './services/MemberService.service'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';  

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchmemberComponent } from './components/FetchUser/FetchUserData.component';
import { createMember } from './components/Addmember/AddMember.component';  
import * as jsdom from 'jsdom';
@NgModule({
	declarations: [
		AppComponent,
		NavMenuComponent,
		HomeComponent,
		FetchmemberComponent,
		createMember
	],
	imports: [
		CommonModule,
		HttpModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot([
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: 'home', component: HomeComponent },
			{ path: 'fetch-user', component: FetchmemberComponent },
			{ path: 'register-member', component: createMember },
			{ path: 'member/edit/:id', component: createMember },  
			{ path: '**', redirectTo: 'home' }
		])
	],
	providers: [MemberService]
})
export class AppModuleShared {
}
