import {DeliveryType} from "./delivery.type";
import {PaymentType} from "./payment.type";

export type OrderType = {
    deliveryType: DeliveryType,
    firstName: string,
    fatherName: string,
    lastName: string,
    phone: string,
    email: string,
    paymentType: PaymentType,
    street?: string,
    house?: string,
    entrance?: string,
    apartment?: string,
    comment?: string,
    items?: {
        id: string,
        quantity: number,
        price: number,
        total: number,
    }[],
}
