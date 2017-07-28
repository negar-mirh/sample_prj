import { Component, Input, Output, EventEmitter, Renderer } from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnChanges {
    @Input() items = [];
    @Input('page-size') PageSize = 10;
    currentPageNo = 1;
    lastPage = 5;
    @Output('page-­changed') onPageChange = new EventEmitter();
    pages=[];

    ngOnChanges() {
        this.pages=[];
        this.lastPage = Math.ceil((this.items.length) / this.PageSize);
        for (var i = 1; i <= this.lastPage; i++)
            this.pages.push(i);
        console.log(this.pages);
    }
    onClick(pageno) {
        this.currentPageNo = pageno;
        console.log(pageno);
        this.getEmmiter();
    }
    goNext() {
        if (this.currentPageNo < this.lastPage) {
            this.currentPageNo += 1;
            this.getEmmiter();
        }
    }
    goPrevious() {
        if (this.currentPageNo != 1) {
            this.currentPageNo -= 1;
            this.getEmmiter();
        }
    }
    getEmmiter() {
        this.onPageChange.emit({ pageNo: this.currentPageNo, selectedPost: this.items.slice((this.currentPageNo - 1) * this.PageSize, ((this.currentPageNo - 1) * this.PageSize) + this.PageSize) });
    }
}