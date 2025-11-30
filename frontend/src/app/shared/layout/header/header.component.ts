import {Component, Input, OnInit} from '@angular/core';
import {CategoryType} from "../../../../types/category.type";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() categories: CategoryType[] = []
    isLogged: boolean = false

    constructor(private authService: AuthService) {
        this.isLogged = this.authService.isLogged
    }

    ngOnInit(): void {
        this.authService.isLogged$.subscribe((result: boolean) => {
            this.isLogged = result
        })
    }

    logout(): void {
        // Временно
        this.authService.removeTokens()
        this.authService.userId = null
    }
}
