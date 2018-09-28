import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { ISchedule } from "./schedule";
import { throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class ScheduleService{
    constructor(private httpClient: HttpClient){
    }

    getSchedules() {
        const apiUrl = `${environment.apiUrl}schedulers/`;
        let response$ = this.httpClient.get<ISchedule[]>(apiUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError));
        return response$;
    }

    
    getSchedule(id:number) {
        const apiUrl = `${environment.apiUrl}schedulers/${id}`;
        let response$ = this.httpClient.get<ISchedule>(apiUrl).pipe(
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