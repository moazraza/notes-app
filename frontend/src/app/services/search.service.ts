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
        console.log('Searching for:', query);
        return this.http.get<any>(this.apiUrl, {
            params: {q: query}
        });
    }

    getQuery() {
        return this.currentQuery;
    }

    setQuery(query: string) {
        this.currentQuery = query;
    }

}
