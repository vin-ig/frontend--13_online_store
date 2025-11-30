import {Component, Input, OnInit} from '@angular/core';
import {CategoryType} from "../../../../types/category.type";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() categories: CategoryType[] = []
    isLogged: boolean = false

    constructor(
        private authService: AuthService,
        private _snackBar: MatSnackBar,
        private router: Router,
    ) {
        this.isLogged = this.authService.isLogged
    }

    ngOnInit(): void {
        this.authService.isLogged$.subscribe((result: boolean) => {
            this.isLogged = result
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
