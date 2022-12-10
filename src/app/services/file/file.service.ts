import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = "http://localhost:8080/file-upload";

  constructor(private httpClient: HttpClient) { }

  uploadFile(fileInfo: any) {
    let headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post(this.baseUrl, {
      headers: headers,
    }, fileInfo);
  }
}
