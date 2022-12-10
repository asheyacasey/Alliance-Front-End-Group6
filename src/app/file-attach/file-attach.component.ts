import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'app-file-attach',
  templateUrl: './file-attach.component.html',
  styleUrls: ['./file-attach.component.css']
})
export class FileAttachComponent implements OnInit {

  ticketID: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fileSrvc: FileService, private fForm: FormBuilder) { }

  fileForm = this.fForm.group({
    fileName: ['', Validators.required]
  });

  ngOnInit(): void {
    this.ticketID = this.data.ticketID;
    console.log(this.ticketID);
  }

  uploadFile() {
    var fileInfo: FormData = new FormData();

    if (this.fileForm.valid) {
      fileInfo.append('file', this.fFormInfo['fileName'].value.toString());
      fileInfo.append('fileTickID', this.ticketID.toString());

      console.log(this.fFormInfo['fileName'].value);
      this.fileSrvc.uploadFile(fileInfo).subscribe((res) => {
        console.log(res);
        if (confirm("File was successfully uploaded!")) {
          window.location.reload();
        }
      })
    }
    else {
      alert("Cannot upload empty attachment!");
    }
  }

  get fFormInfo() {
    return this.fileForm.controls;
  }
}
