import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CategoryWithTypeType} from "../../../../types/category-with-type.type";
import {CartService} from "../../services/cart.service";
import {CartCountType} from "../../../../types/cart-count.type";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() categories: CategoryWithTypeType[] = []
    isLogged: boolean = false
    productsCount: number = 0

    constructor(
        private authService: AuthService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private cartService: CartService,
    ) {
        this.isLogged = this.authService.isLogged
    }

    ngOnInit(): void {
        this.authService.isLogged$.subscribe((result: boolean) => {
            this.isLogged = result
        })

        this.cartService.getProductsCount().subscribe((result: CartCountType | DefaultResponseType) => {
            this.productsCount = (result as CartCountType).count
        })

        this.cartService.count$.subscribe((result: number) => {
            this.productsCount = result
        })
    }

    logout(): void {
        this.authService.logout().subscribe({
            next: (() => {
                this.doLogout()
            }),
            error: () => {
                this.doLogout()
            }
        })
    }

    doLogout(): void {
        this.authService.removeTokens()
        this.authService.userId = null
        this._snackBar.open('Вы вышли из системы', 'Закрыть')
        this.router.navigate(['/'])
    }
}
