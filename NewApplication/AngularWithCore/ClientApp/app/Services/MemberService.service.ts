import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class MemberService {
	myAppUrl: string = "";
	constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
		this.myAppUrl = baseUrl;
	}
	getMembers() {
		return this._http.get(this.myAppUrl + 'api/Member/GetMembers')
			.map((response: Response) => response.json())
			.catch(this.errorHandler);
	}
	getMemberById(id: string) {
		return this._http.get(this.myAppUrl + "api/Member/GetMemberByCin?cin=" + id)
			.map((response: Response) => response.json())
			.catch(this.errorHandler);
	}	
	saveMember(member) {
		return this._http.post(this.myAppUrl + 'api/Member/AddMember', member)
			.map((response: Response) => response.json())
			.catch(this.errorHandler);
	}
	updateMember(member) {
		return this._http.put(this.myAppUrl + 'api/Member/UpdateMember', member)
			.map((response: Response) => response.json())
			.catch(this.errorHandler);
	}
	deleteMember(id) {
		return this._http.delete(this.myAppUrl + 'api/Member/DeleteMember?cin='+ id)
			.map((response: Response) => response.json())
			.catch(this.errorHandler);
	}  
	errorHandler(error: Response) {
		console.log(error);
		return Observable.throw(error);
	}
}