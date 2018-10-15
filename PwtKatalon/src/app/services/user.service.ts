import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private apiService: ApiService) {
    }

    getUsers(pageNumber: string, pageSize: string) {
        const action = `users`;

        let myParams = new HttpParams({
            fromObject: {
                PageNumber: pageNumber,
                PageSize: pageSize,
            }
        })

        return this.apiService.get(action, myParams);
    }
}