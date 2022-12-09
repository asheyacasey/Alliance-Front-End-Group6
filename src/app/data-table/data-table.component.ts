import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';
import {MatIconModule} from '@angular/material/icon';

import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { FileAttachComponent } from '../file-attach/file-attach.component';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit {



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;



  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'status', 'subject', 'description', 'edit', 'delete', 'attach'];

  constructor(public dialog: MatDialog) {
    this.dataSource = new DataTableDataSource();
  }

  openDialog() {
    this.dialog.open(NewTicketComponent);
  }

  editDialog(){
    this.dialog.open(EditTicketComponent);
  }

  attachDialog(){
    this.dialog.open(FileAttachComponent);
  }

 

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}


