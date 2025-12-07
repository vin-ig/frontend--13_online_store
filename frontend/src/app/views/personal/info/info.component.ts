import {Component, OnInit} from '@angular/core';
import {DeliveryType} from "../../../../types/delivery.type";
import {PaymentType} from "../../../../types/payment.type";
import {FormBuilder, Validators} from "@angular/forms";
import {CartService} from "../../../shared/services/cart.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../../../shared/services/order.service";

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
    protected readonly deliveryTypes = DeliveryType
    protected readonly paymentTypes = PaymentType

    deliveryType: DeliveryType = DeliveryType.delivery

    userInfoForm = this.fb.group({
        firstName: [''],
        fatherName: [''],
        lastName: [''],
        phone: [''],
        email: ['', Validators.email],
        street: [''],
        house: [''],
        entrance: [''],
        apartment: [''],
        paymentType: [PaymentType.cashToCourier],
    })

    get firstName() {return this.userInfoForm.get('firstName')}
    get fatherName() {return this.userInfoForm.get('fatherName')}
    get lastName() {return this.userInfoForm.get('lastName')}
    get phone() {return this.userInfoForm.get('phone')}
    get email() {return this.userInfoForm.get('email')}
    get street() {return this.userInfoForm.get('street')}
    get house() {return this.userInfoForm.get('house')}
    get entrance() {return this.userInfoForm.get('entrance')}
    get apartment() {return this.userInfoForm.get('apartment')}
    get paymentType() {return this.userInfoForm.get('paymentType')}

    constructor(
        private cartService: CartService,
        private router: Router,
        private _snackBar: MatSnackBar,
        private fb: FormBuilder,
        private orderService: OrderService,
    ) {
        // this.updateDeliveryTypeValidation()
    }

    ngOnInit(): void {
    }

    changeDeliveryType(deliveryType: DeliveryType): void {
        this.deliveryType = deliveryType
        this.userInfoForm.markAsDirty()
        // this.updateDeliveryTypeValidation()
    }

    /*
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
     */

    updateUserInfo() {

    }
}
