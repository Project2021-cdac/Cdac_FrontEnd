import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { Student } from 'src/app/models/student-model';

// TODO: Replace this with your own data model type
/*export interface AdminStudentsItem {
  Name: string;
  PRN: number;
  Email: string;
  Phone: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: AdminStudentsItem[] = [
 {PRN:20024012001,Name:"Harry",Email:"Student1@gmail.com",Phone:"+91 9182736454"},
 {PRN:20024012002,Name:"Steve",Email:"Student2@gmail.com",Phone:"+91 9182736454"},
 {PRN:20024012004,Name:"Ram",Email:"Student4@gmail.com",Phone:"+91 9182736454"},
 {PRN:20024012007,Name:"Anthony",Email:"Student7@gmail.com",Phone:"+91 9182736454"},
 {PRN:20024012003,Name:"Peter",Email:"Student3@gmail.com",Phone:"+91 9182736454"},
 {PRN:20024012006,Name:"Cooper",Email:"Student6@gmail.com",Phone:"+91 9182736454"},
 {PRN:20024012005,Name:"Betty",Email:"Student5@gmail.com",Phone:"+91 9182736454"}
];
*/
/**
 * Data source for the AdminStudents view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AdminStudentsDataSource extends DataSource<Student> {
  
  data: Student[] = this.studentList;
  paginator: MatPaginator;
  sort: MatSort;


  constructor(private studentList :Student[]) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Student[]> {
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
  private getPagedData(data: Student[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Student[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'PRN': return compare(+a.prn, +b.prn, isAsc);
        case 'Name': return compare(a.firstName, b.firstName, isAsc);
        case 'Email': return compare(a.email, b.email, isAsc);
        case 'Phone': return compare(a.phoneNumber, b.phoneNumber, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
