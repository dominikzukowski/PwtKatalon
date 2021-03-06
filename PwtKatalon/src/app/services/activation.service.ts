import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { IActivation } from "../models/activation";
import { IPagination } from "../shared/pagination";
import { ApiService } from "./api.service";
import { IUser } from "../models/user";



@Injectable({
    providedIn: 'root'
})
export class ActivationService {
    constructor(private httpClient: HttpClient, private apiService: ApiService) {
    }

    getActivation(id: number) {
        const action = `activations/${id}`;
        return this.apiService.get<IActivation>(action);
    }

    getActivations(pageNumber: string, pageSize: string) {
        const action = `activations`;

        let myParams = new HttpParams({
            fromObject: {
                PageNumber: pageNumber,
                PageSize: pageSize,
            }
        })

        let response$ = this.apiService.get<IPagination<IActivation>>(action, myParams);
        return response$;
    }

    getReport(id: number) {
        const action = `activations/${id}/report`;

        return this.apiService.get(action, null, 'arraybuffer');
    }

    getReportPage(id: number) {
        const action = `activations/strona2`;

        return this.apiService.get(action);
    }

    getVersions() {
        const action = `activations/versions`;
        return this.apiService.get<string[]>(action);
    }

    getEnvironments() {
        const action = `activations/environments`;
        return this.apiService.get<string[]>(action);
    }

    getUsers() {
        const action = `activations/users`;
        return this.apiService.get<IUser[]>(action);
    }


    getDetails(environmentId: string, version: string, user: string, count: string) {
        const action = `activations/details/${environmentId}/${version}/${user}/${count}`;
        return this.apiService.get<Array<Array<string>>>(action);
    }

    getActivationErrorLog(id: number) {
        const action = `activations/${id}/errorlog`;
        return this.apiService.get<IActivation>(action);
    }

    getActivationConsoleLog(id:number) {
        const action = `activations/${id}/consolelog`;
        return this.apiService.get<IActivation>(action);
    }

}