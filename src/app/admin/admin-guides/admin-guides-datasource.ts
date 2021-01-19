import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { OnInit } from '@angular/core';
import { Guide } from 'src/app/models/guide-model';

// TODO: Replace this with your own data model type
/*export interface AdminGuidesItem {
  name: string;
  id: number;
}*/

// TODO: replace this with real data from your application
/*const EXAMPLE_DATA: AdminGuidesItem[] = [
  {id: 1, name: 'Hydrogen Guide  1'},
  {id: 2, name: 'Helium Guide  1'},
  {id: 3, name: 'Lithium Guide  1'},
  {id: 4, name: 'Beryllium Guide  1'},
  {id: 5, name: 'Boron Guide  1'},
  {id: 6, name: 'Carbon Guide  1'},
  {id: 7, name: 'Nitrogen Guide  1'},
  {id: 8, name: 'Oxygen Guide  1'},
  {id: 9, name: 'Fluorine Guide  1'},
  {id: 10, name: 'Neon Guide  1'},

];*/

/**
 * Data source for the AdminGuides view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AdminGuidesDataSource extends DataSource<Guide> {
  data: Guide[] = this.guidesList;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private guidesList :Guide[]) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Guide[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }
  
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Guide[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Guide[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.firstName, b.firstName, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
