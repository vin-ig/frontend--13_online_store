import {Component, Input, OnInit} from '@angular/core';
import {CategoryWithTypeType} from "../../../../types/category-with-type.type";

@Component({
    selector: 'category-filter',
    templateUrl: './category-filter.component.html',
    styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
    @Input() categoryWithTypes: CategoryWithTypeType | null = null
    @Input() type: string | null = null

    get title(): string {
        if (this.categoryWithTypes) {
            return this.categoryWithTypes.name
        } else if (this.type) {
            if (this.type === 'diameter') {
                return 'Диаметр'
            } else if (this.type === 'height') {
                return 'Высота'
            }
        }
        return ''
    }

    constructor() {
    }

    ngOnInit(): void {
    }

}
