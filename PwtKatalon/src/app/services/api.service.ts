import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class ApiService {
  constructor(
    private httpClient: HttpClient
  ) { }

  get<T>(action: string, options: any = "") {
    const apiUrl = `${environment.apiUrl}${action}`;
    let response$ = this.httpClient.get<T>(apiUrl, options).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError));
    return response$;
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}