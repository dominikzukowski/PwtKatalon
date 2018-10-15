import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { IPagination } from "../shared/pagination";
import { IUser } from "../models/user";
import { tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private httpClient: HttpClient){
    }

    
    getUsers(pageNumber:string, pageSize:string) {
        const apiUrl = `${environment.apiUrl}users`;

        let myParams = new HttpParams({
            fromObject: {
                PageNumber:pageNumber,
                PageSize:pageSize,
            }
        })

        let response$ = this.httpClient.get<IPagination<IUser>>(apiUrl, {params:myParams}).pipe(
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