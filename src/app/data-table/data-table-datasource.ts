import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { TicketService } from '../services/ticket/ticket.service';
import { AppInjector } from '../app.module';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  ticketID: number,
  assigneeID: number,
  status: string,
  subject: string,
  description: string,
  tracker: string,
  requesterID: number,
  createdAt: string
}

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: DataTableItem[] = [
//   { ticketID: 1, assignee: 'Hydrogen', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 2, assignee: 'Helium', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 3, assignee: 'Lithium', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 4, assignee: 'Beryllium', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 5, assignee: 'Boron', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 6, assignee: 'Carbon', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 7, assignee: 'Nitrogen', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 8, assignee: 'Oxygen', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 9, assignee: 'Fluorine', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 10, assignee: 'Neon', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 11, assignee: 'Sodium', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 12, assignee: 'Magnesium', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 13, assignee: 'Aluminum', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 14, assignee: 'Silicon', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 15, assignee: 'Phosphorus', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 16, assignee: 'Sulfur', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 17, assignee: 'Chlorine', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 18, assignee: 'Argon', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 19, assignee: 'Potassium', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
//   { ticketID: 20, assignee: 'Calcium', status: 'Available', subject: 'Recuit Report', description: 'Report to Recuit' },
// ];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  ticketList$: any;
  tickSrvc: TicketService;
  loggedUser: any;

  constructor() {
    super();
    this.tickSrvc = AppInjector.get(TicketService);
    this.loggedUser = localStorage.getItem('userRole');
    this.getTickets();
  }

  getTickets() {
    if (this.loggedUser == "Admin") {
      this.tickSrvc.getAllTickets()
        .subscribe((data) => {
          this.data = data;
          console.log(this.data);
        })
    }
    else if (this.loggedUser == "Customer") {
      this.tickSrvc.getCustomerTicks()
        .subscribe((data) => {
          this.data = data;
          console.log(this.data);
        })
    }
    else {
      this.tickSrvc.getPersonnelTicks()
        .subscribe((data: any) => {
          this.data = data;
          console.log(this.data);
        })
    }
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]): DataTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'assigneeID': return compare(a.assigneeID, b.assigneeID, isAsc);
        case 'ticketID': return compare(+a.ticketID, +b.ticketID, isAsc);
        case 'subject': return compare(a.subject, b.subject, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
