import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {CartType} from "../../../../types/cart.type";
import {CartService} from "../../../shared/services/cart.service";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    readonly serverStaticPath: string = environment.serverStaticPath
    recommendedProducts: ProductType[] = []
    product!: ProductType
    count: number = 1

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

    constructor(
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private cartService: CartService,
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.productService.getProduct(params['url']).subscribe((result: ProductType) => {
                this.cartService.getCart().subscribe((cartData: CartType) => {
                    if (cartData) {
                        const productInCart = cartData.items.find(item => item.product.id === result.id)
                        if (productInCart) {
                            result.countInCart = productInCart.quantity
                            this.count = result.countInCart
                        }
                    }

                    this.product = result
                })
            })
        })

        this.productService.getBestProducts().subscribe((result: ProductType[]) => {
            this.recommendedProducts = result
        })
    }

    updateCount(value: number): void {
        this.count = value
        if (this.product.countInCart) {
            this.addToCart()
        }
    }

    addToCart() {
        this.cartService.updateCart(this.product.id, this.count).subscribe((result: CartType) => {
            this.product.countInCart = this.count
        })
    }

    removeFromCart() {
        this.cartService.updateCart(this.product.id, 0).subscribe((result: CartType) => {
            this.product.countInCart = 0
            this.count = 1
        })
    }
}
