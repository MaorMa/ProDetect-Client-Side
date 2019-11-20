import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class baseURLService {

    appConfig: any;

    constructor(private http: HttpClient) {
    }

    /**
     * Read json file with bseURL and return promise for baseURL
     */
    getBaseURL(): any {
        return this.http.get('assets/baseURLconfig.json')
            .toPromise()
            .then(data => {
                console.log(data)
                this.appConfig = data;
            });
    }
}