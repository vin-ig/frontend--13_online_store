import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {CartService} from "../../../shared/services/cart.service";
import {CartType} from "../../../../types/cart.type";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    readonly serverStaticPath: string = environment.serverStaticPath
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        margin: 24,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 4
            }
        },
        nav: false
    }

    extraProducts: ProductType[] = []
    cart: CartType | null = null
    totalPrice: number = 0
    totalCount: number = 0

    constructor(
        private productService: ProductService,
        private cartService: CartService,
    ) {
    }

    ngOnInit(): void {
        this.productService.getBestProducts().subscribe((result: ProductType[]) => {
            this.extraProducts = result
        })

        this.cartService.getCart().subscribe((result: CartType) => {
            this.cart = result
            this.calculateTotal()
        })
    }

    calculateTotal(): void {
        this.totalPrice = 0
        this.totalCount = 0

        if (this.cart) {
            this.cart.items.forEach(item => {
                this.totalPrice += item.quantity * item.product.price
                this.totalCount += item.quantity
            })
        }
    }
}
