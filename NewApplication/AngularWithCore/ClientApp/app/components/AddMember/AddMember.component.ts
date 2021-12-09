import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchmemberComponent } from '../FetchUser/FetchUserData.component';
import { MemberService } from '../../services/MemberService.service';
import * as $ from 'jquery';

@Component({
	selector: 'createmember',
	templateUrl: './AddMember.component.html'
})
export class createMember implements OnInit {
	memberForm: FormGroup;
	title: string = "Create";
	cin: string;
	errorMessage: any;
	constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
		private _memberService: MemberService, private _router: Router) {
		if (this._avRoute.snapshot.params["id"]) {
			this.cin = this._avRoute.snapshot.params["id"];
		}
		this.memberForm = this._fb.group({
			cin: ['', [Validators.required]],
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			ssn: ['', [Validators.required]],
			addressLine1: [''],
			addressLine2: [''],
			city: [''],
			state: [''],
			zip: ['']
		});
	}
	ngOnInit() {
		if (this.cin != null) {
			this.title = "Edit";
			this._memberService.getMemberById(this.cin)
				.subscribe(resp => this.setFormData(resp)
				, error => this.errorMessage = error);
		}
	}
	setFormData(data) {
		
		this.memberForm.setValue(data);
		$('#txtcin').prop("disabled", true); 		
	};
	save() {
		if (!this.memberForm.valid) {
			return;
		}
		if (this.title === "Create") {
			this._memberService.saveMember(this.memberForm.value)
				.subscribe((data) => {
						this._router.navigate(['/fetch-user']);
					},
					error => this.errorMessage = error);
		}
		else if (this.title === "Edit") {
			this._memberService.updateMember(this.memberForm.value)
				.subscribe((data) => {
						this._router.navigate(['/fetch-user']);
					},
					error => this.errorMessage = error);
		}
	}
	cancel() {
		this._router.navigate(['/fetch-user']);
	}
	//get cin() { return this.memberForm.get('cin'); }
	get firstName() { return this.memberForm.get('firstName'); }
	get lastName() { return this.memberForm.get('lastName'); }
	get ssn() { return this.memberForm.get('ssn'); }
	get addressLine1() { return this.memberForm.get('addressLine1'); }
	get addressLine2() { return this.memberForm.get('addressLine2'); }
	get city() { return this.memberForm.get('city'); }
	get state() { return this.memberForm.get('state'); }
	get zip() { return this.memberForm.get('zip'); }
	
}