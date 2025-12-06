import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DefaultResponseType} from "../../../types/default-response.type";
import {FavoriteType} from "../../../types/favorite.type";

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {

    constructor(private http: HttpClient) {
    }

    getFavorites(): Observable<FavoriteType[] | DefaultResponseType> {
        return this.http.get<FavoriteType[] | DefaultResponseType>(environment.api + 'favorites')
    }

}
