import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { IActivation } from "../models/activation";
import { IPagination } from "../shared/pagination";
import { ApiService } from "./api.service";
import { environment } from "src/environments/environment";
import { tap, catchError } from "rxjs/operators";



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

        let response$ = this.apiService.get<IPagination<IActivation>>(action, myParams);
        return response$;
    }

    getReport(id: number){
        const action = `activations/${id}/report`;

        return this.apiService.get(action,null,'arraybuffer');
    }

    getVersions()
    {
        const action = `activations/versions`;
        return this.apiService.get<string[]>(action);
    }

    getEnvironments()
    {
        const action = `activations/environments`;
        return this.apiService.get<string[]>(action);
    }


    getDetails(environmentId:string, version:string)
    {
        const action = `activations/details/${environmentId}/${version}`;
        return this.apiService.get<Array<Array<string>>>(action);
    }

    getActivationErrorLog(id: number) {
        const action = `activations/${id}/logs`;
        return this.apiService.get<IActivation>(action);
    }

   getActivationErrorLog2(id: number) {
    const apiUrl = `${environment.apiUrl}activations/${id}/logs`;
    let response$ = this.httpClient.get<IActivation>(apiUrl).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(null));

    return response$;
}
}