import {CartService} from "./cart.service";
import {of} from "rxjs";

describe('Cart Service', () => {
    let cartService: CartService
    const countValue = 3

    beforeEach(() => {
        const valueServiceSpy = jasmine.createSpyObj('HttpClient', ['get'])
        valueServiceSpy.get.and.returnValue(of({count: countValue}))

        cartService = new CartService(valueServiceSpy)
    })

    it('should return cart count', (done: DoneFn) => {
        cartService.count$.subscribe(value => {
            expect(value).toBe(countValue)
            done()
        })

        cartService.getProductsCount().subscribe()
    })

})
