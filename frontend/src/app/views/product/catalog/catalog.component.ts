import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryWithTypeType} from "../../../../types/category-with-type.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActiveParamsUtil} from "../../../shared/utils/active-params.util";
import {AppliedFilterType} from "../../../../types/applied-filter.type";

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
    products: ProductType[] = []
    categoriesWithTypes: CategoryWithTypeType[] = []
    activeParams: ActiveParamsType = {types: []}
    appliedFilters: AppliedFilterType[] = []

    openSort: boolean = false
    sortingOptions: {name: string, value: string}[] = [
        {name: 'От А до Я', value: 'az-asc'},
        {name: 'От Я до А', value: 'az-desc'},
        {name: 'По возрастанию цены', value: 'price-asc'},
        {name: 'По убыванию цены', value: 'price-desc'},
    ]

    pages: number[] = []

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        ) {
    }

    ngOnInit(): void {
        this.categoryService.getCategoriesWithTypes().subscribe((result: CategoryWithTypeType[]) => {
            this.categoriesWithTypes = result

            // Обновление данных из url
            this.activatedRoute.queryParams.subscribe(params => {
                this.activeParams = ActiveParamsUtil.processParams(params)
                this.appliedFilters = []
                this.activeParams.types.forEach(url => {
                    for (let i = 0; i < this.categoriesWithTypes.length; i++) {
                        const fondType = this.categoriesWithTypes[i].types.find(type => type.url === url)
                        if (fondType) {
                            this.appliedFilters.push({
                                name: fondType.name,
                                urlParam: fondType.url
                            })
                        }
                    }
                })

                if (this.activeParams.heightFrom) {
                    this.appliedFilters.push({
                        name: 'Высота: от ' + this.activeParams.heightFrom + ' см',
                        urlParam: 'heightFrom'
                    })
                }
                if (this.activeParams.heightTo) {
                    this.appliedFilters.push({
                        name: 'Высота: до ' + this.activeParams.heightTo + ' см',
                        urlParam: 'heightTo'
                    })
                }
                if (this.activeParams.diameterFrom) {
                    this.appliedFilters.push({
                        name: 'Диаметр: от ' + this.activeParams.diameterFrom + ' см',
                        urlParam: 'diameterFrom'
                    })
                }
                if (this.activeParams.diameterTo) {
                    this.appliedFilters.push({
                        name: 'Диаметр: до ' + this.activeParams.diameterTo + ' см',
                        urlParam: 'diameterTo'
                    })
                }

                // Запрос товаров на сервере
                this.productService.getProducts(this.activeParams).subscribe((result) => {
                    this.products = result.items
                    this.pages = []
                    for (let i = 1; i <= result.pages; i++) {
                        this.pages.push(i)
                    }
                })
            })
        })
    }

    removeAppliedFilter(filter: AppliedFilterType): void {
        if (filter.urlParam === 'heightFrom' || filter.urlParam === 'heightTo' ||
            filter.urlParam === 'diameterFrom' || filter.urlParam === 'diameterTo') {
            delete this.activeParams[filter.urlParam]
        } else {
            this.activeParams.types = this.activeParams.types.filter(item => item !== filter.urlParam)
        }

        this.activeParams.page = 1
        this.router.navigate(['/catalog'], {queryParams: this.activeParams})
    }

    toggleSort(): void {
        this.openSort = !this.openSort
    }

    sort(value: string):void {
        this.activeParams.sort = value
        this.router.navigate(['/catalog'], {queryParams: this.activeParams})
    }

    openPage(page: number): void {
        this.activeParams.page = page
        this.router.navigate(['/catalog'], {queryParams: this.activeParams})
    }

    openPrevPage(): void {
        if (this.activeParams.page && this.activeParams.page > 1) {
            this.activeParams.page--
            this.router.navigate(['/catalog'], {queryParams: this.activeParams})
        }
    }

    openNextPage(): void {
        if (this.activeParams.page && this.activeParams.page < this.pages.length) {
            this.activeParams.page++
            this.router.navigate(['/catalog'], {queryParams: this.activeParams})
        }
    }
}
