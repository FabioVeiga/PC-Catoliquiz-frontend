import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss'],
})
export class PaginacaoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() disabled = false;
  @Input() hidePageSize = false;
  @Input() hideActualPage = false;
  @Input() pageSizeOptions: number[] = [10, 20, 50];
  @Input() showFirstLastButtons = true;
  @Output() page = new EventEmitter<PageEvent>();

  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() length = 0;

  ngOnInit() {
    this.pageSize = this.pageSizeOptions[0];
  }

  onPageChange(pageEvt: PageEvent) {
    this.length = pageEvt.length;
    this.pageIndex = pageEvt.pageIndex;
    this.pageSize = pageEvt.pageSize;
    this.emitPageEvent(pageEvt);
  }

  emitPageEvent(pageEvent: PageEvent) {
    this.page.next(pageEvent);
  }
}
