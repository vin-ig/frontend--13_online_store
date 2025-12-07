import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {CartType} from "../../../../types/cart.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeliveryType} from "../../../../types/delivery.type";
import {FormBuilder, Validators} from "@angular/forms";
import {PaymentType} from "../../../../types/payment.type";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    cart: CartType | null = null
    totalCount: number = 0
    productsPrice: number = 0
    deliveryPrice: number = 10  // На бэке нет таких данных, поэтому хардкодим
    totalPrice: number = 0

    deliveryTypes = DeliveryType
    paymentTypes = PaymentType
    deliveryType: DeliveryType = DeliveryType.delivery

    orderForm = this.fb.group({
        firstName: ['', Validators.required],
        fatherName: [''],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        street: [''],
        house: [''],
        entrance: [''],
        apartment: [''],
        paymentType: [PaymentType.cashToCourier, Validators.required],
        comment: [''],
    })

    get firstName() {return this.orderForm.get('firstName')}
    get fatherName() {return this.orderForm.get('fatherName')}
    get lastName() {return this.orderForm.get('lastName')}
    get phone() {return this.orderForm.get('phone')}
    get email() {return this.orderForm.get('email')}
    get street() {return this.orderForm.get('street')}
    get house() {return this.orderForm.get('house')}
    get entrance() {return this.orderForm.get('entrance')}
    get apartment() {return this.orderForm.get('apartment')}
    get paymentType() {return this.orderForm.get('paymentType')}
    get comment() {return this.orderForm.get('comment')}

    constructor(
        private cartService: CartService,
        private router: Router,
        private _snackBar: MatSnackBar,
        private fb: FormBuilder,
    ) {
        this.updateDeliveryTypeValidation()
    }

    ngOnInit(): void {
        this.cartService.getCart().subscribe((result: CartType | DefaultResponseType) => {
            if ((result as DefaultResponseType).error !== undefined) {
                throw new Error((result as DefaultResponseType).message)
            }

            this.cart = result as CartType
            if (!this.cart || this.cart.items.length === 0) {
                this._snackBar.open('Корзина пустая', 'Закрыть')
                this.router.navigate(['/'])
            }
            this.calculateTotal()
        })
    }

    calculateTotal(): void {
        this.productsPrice = 0
        this.totalCount = 0

        if (this.cart) {
            this.cart.items.forEach(item => {
                this.productsPrice += item.quantity * item.product.price
                this.totalCount += item.quantity
            })
            this.totalPrice = this.productsPrice + this.deliveryPrice
        }
    }

    changeDeliveryType(deliveryType: DeliveryType): void {
        this.deliveryType = deliveryType
        this.updateDeliveryTypeValidation()
    }

    updateDeliveryTypeValidation() {
        if (this.deliveryType === DeliveryType.delivery) {
            this.street?.setValidators(Validators.required)
            this.house?.setValidators(Validators.required)
        } else {
            this.street?.removeValidators(Validators.required)
            this.house?.removeValidators(Validators.required)
            this.street?.setValue('')
            this.house?.setValue('')
            this.entrance?.setValue('')
            this.apartment?.setValue('')
        }

        this.street?.updateValueAndValidity()
        this.house?.updateValueAndValidity()
    }

    createOrder() {

    }
}
