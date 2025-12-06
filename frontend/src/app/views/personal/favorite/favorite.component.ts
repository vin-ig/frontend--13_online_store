import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FavoriteType} from "../../../../types/favorite.type";
import {FavoriteService} from "../../../shared/services/favorite.service";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
    readonly serverStaticPath: string = environment.serverStaticPath
    products: FavoriteType[] = []

    constructor(
        private favoriteService: FavoriteService,
    ) {
    }

    ngOnInit(): void {
        this.favoriteService.getFavorites().subscribe((result: FavoriteType[] | DefaultResponseType) => {
            if ((result as DefaultResponseType).error !== undefined) {
                const error = (result as DefaultResponseType).message
                throw new Error(error)
            }
            this.products = result as FavoriteType[]
        })
    }

    removeFromFavorite(id: string) {

    }
}
