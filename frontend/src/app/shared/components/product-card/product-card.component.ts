import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {environment} from "../../../../environments/environment";
import {CartService} from "../../services/cart.service";
import {CartType} from "../../../../types/cart.type";

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    readonly serverStaticPath: string = environment.serverStaticPath
    count: number = 1

    @Input() product!: ProductType
    @Input() isLite: boolean = false
    @Input() countInCart: number | undefined = 0

    constructor(
        private cartService: CartService,
    ) {
    }

    ngOnInit(): void {
        if (this.countInCart && this.countInCart > 1) {
            this.count = this.countInCart
        }
    }

    updateCount(value: number): void {
        this.count = value
        if (this.countInCart) {
            this.addToCart()
        }
    }

    addToCart() {
        this.cartService.updateCart(this.product.id, this.count).subscribe((result: CartType) => {
            this.countInCart = this.count
        })
    }

    removeFromCart() {
        this.cartService.updateCart(this.product.id, 0).subscribe((result: CartType) => {
            this.countInCart = 0
            this.count = 1
        })
    }
}
