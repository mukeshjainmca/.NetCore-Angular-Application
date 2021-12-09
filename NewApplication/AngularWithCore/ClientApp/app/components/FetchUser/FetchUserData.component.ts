import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from '../../services/MemberService.service';


@Component({
	selector: 'fetchuser',
	templateUrl: './FetchUserData.component.html'
})
export class FetchmemberComponent {
	public memberList: MemberData[];
	constructor(public http: Http, private _router: Router, private _memberService: MemberService) {
		this.getMembers();				
	}
	getMembers() {
		this._memberService.getMembers().subscribe(
			data => this.memberList = data
		);
	}
	getMemberById(id) {
		this._memberService.getMemberById(id).subscribe(
			data => this.memberList = data
		);					
	}
	delete(id) {
		var ans = confirm("Do you want to delete customer with Id: " + id);
		if (ans) {
			this._memberService.deleteMember(id).subscribe((data) => {
					this.getMembers();
				},
				error => console.error(error));
		}
	}
}
interface MemberData {
	Cin: string;
	FirstName: string;
	LastName: string;
	Ssn: string;
	AddressLine1: string;
	AddressLine2: string;
	City: string;
	State: string;
	Zip: string;
}