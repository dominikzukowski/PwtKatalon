import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseContentType } from '@angular/http'
import { IActivation } from "./activation";
import { catchError, tap} from "rxjs/operators";
import { throwError } from "rxjs";
import { environment } from '../../environments/environment';

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

    getActivations() {
        const apiUrl = `${environment.apiUrl}activations/`;
        let response$ = this.httpClient.get<IActivation[]>(apiUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError));
        return response$;
    }

    getActivationReport(id: number) {
        const apiUrl = `${environment.apiUrl}activations/${id}/report`;
        let response$ = this.httpClient.get<string>(apiUrl).pipe(
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