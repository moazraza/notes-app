import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private apiUrl = 'http://127.0.0.1:5000/search';

    private currentQuery: string = ''

    constructor(private http: HttpClient) {
    }

    search(query: string) {
        // Implement your search logic here
        console.log('Searching for:', query);
        const q = this.apiUrl + '?q=' + query;
        return this.http.get<any>(q);
    }

    getQuery() {
        return this.currentQuery;
    }

    setQuery(query: string) {
        this.currentQuery = query;
    }

}
