import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/models/tools/document';
import { DocumentService } from 'src/app/services/tools/document.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  documents: Document[] = []
  selectedDocument: Document = new Document();
  selectedIndex: number = 0;
  newDocument: Document = new Document();
  documentTypes = environment.DOCUMENT_TYPES;
  documentStates = environment.DOCUMENT_STATES;

  constructor(private documentService: DocumentService) { }

  async ngOnInit() {
    await this.documentService.getAllDocuments().subscribe(
      data => this.documents = data
    );
    this.newDocument.author = parseInt(localStorage.getItem("userId") || "0");
    this.newDocument.updated_by = this.newDocument.author;
  }

  selectDocument(index: number) {
    this.selectedDocument = this.documents[index];
    this.selectedIndex = index; 
  }

  addNewDocument() {
    this.documentService.addDocument(this.newDocument).subscribe(
      data => {
        this.documents.push(data);
        document.getElementById("cancel-add-document")?.click();
      },
      httpError => {
        console.log(httpError);
      }
    )
  }

  deleteDocument() {
    //
  }

}
