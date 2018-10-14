import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IActivation } from "../models/activation";
import { catchError, tap} from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IPagination } from "../shared/pagination";



@Injectable({
    providedIn: 'root'
})
export class ActivationService {
    constructor(private httpClient: HttpClient){
    }

    getActivation(id: number) {
        const apiUrl = `${environment.apiUrl}activations/${id}`;
        let response$ = this.httpClient.get<IActivation>(apiUrl);
        return response$;
    }

    getActivations(pageNumber:string, pageSize:string) {
        const apiUrl = `${environment.apiUrl}activations`;

        let myParams = new HttpParams({
            fromObject: {
                PageNumber:pageNumber,
                PageSize:pageSize,
            }
        })

        let response$ = this.httpClient.get<IPagination<IActivation>>(apiUrl, {params:myParams}).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError));
        return response$;
    }

    getReport(id: number){
        const apiUrl = `${environment.apiUrl}activations/${id}/report`;
        let response$ = this.httpClient.get(apiUrl, {responseType: 'arraybuffer'}).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError));
        return response$;
    }

    getVersions()
    {
        const apiUrl = `${environment.apiUrl}activations/versions`;
        let response$ = this.httpClient.get<string[]>(apiUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError));
        return response$;
    }

    getEnvironments()
    {
        const apiUrl = `${environment.apiUrl}activations/environments`;
        let response$ = this.httpClient.get<string[]>(apiUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError));
        return response$;
    }

    getDetails(environmentId:string, version:string)
    {
        const apiUrl = `${environment.apiUrl}activations/details/${environmentId}/${version}`;
        let response$ = this.httpClient.get<Array<Array<string>>>(apiUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError));
        return response$;
    }

    getActivationErrorLog(id: number) {
        const apiUrl = `${environment.apiUrl}activations/${id}/logs`;
        let response$ = this.httpClient.get<IActivation>(apiUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError));

        return response$;
    }

    private handleError(err:HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage= `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}