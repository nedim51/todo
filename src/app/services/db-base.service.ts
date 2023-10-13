import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DBBaseService {

    constructor(private http: HttpClient) { }

    // Получить
    public get(url: string, options: any = {}): Observable<any> {
        return this.http.get(environment.baseUrl + url, { 
            ...options 
        })
    }

    // Отправить сущностей к определённому ресурсу
    public post(url: string, body: any, headers: HttpHeaders, options: any = {}) : Observable<any> {
        return this.http.post(environment.baseUrl + url, body, { 
            headers: headers,
            ...options
        })
    }

    // Заменяет все текущие представления ресурса данными запроса
    public put(url: string, body: any, headers: HttpHeaders, options: any = {}): Observable<any> {
        return this.http.put(environment.baseUrl + url, body, { 
            headers: headers,
            ...options
        })
    }

    // Изменить частично ресурс
    public patch(url: string, body: any, headers: HttpHeaders, options: any = {}): Observable<any> {
        return this.http.patch(environment.baseUrl + url, body, { 
            headers: headers,
            ...options
        })
    }

    // Удалить
    public delete(url: string): Observable<any> {
        return this.http.delete(environment.baseUrl + url)
    }
}