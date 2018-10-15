import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { IActivation } from "../models/activation";
import { IPagination } from "../shared/pagination";
import { ApiService } from "./api.service";



@Injectable({
    providedIn: 'root'
})
export class ActivationService {
    constructor(private httpClient: HttpClient, private apiService: ApiService){
    }

    getActivation(id: number) {
        const action = `activations/${id}`;
        return this.apiService.get<IActivation>(action);
    }

    getActivations(pageNumber:string, pageSize:string) {
        const action = `activations`;

        let myParams = new HttpParams({
            fromObject: {
                PageNumber:pageNumber,
                PageSize:pageSize,
            }
        })

        let response$ = this.apiService.get<IPagination<IActivation>>(action, {params: myParams});
        return response$;
    }

    getReport(id: number){
        const action = `activations/${id}/report`;
        return this.apiService.get(action,{responseType:'arraybuffer'} );
    }

    getVersions()
    {
        const action = `activations/versions`;
        return this.apiService.get(action);
    }

    getEnvironments()
    {
        const action = `activations/environments`;
        return this.apiService.get(action);
    }

    getDetails(environmentId:string, version:string)
    {
        const action = `activations/details/${environmentId}/${version}`;
        return this.apiService.get(action);
    }

    getActivationErrorLog(id: number) {
        const action = `activations/${id}/logs`;
        return this.apiService.get(action);
   }
}