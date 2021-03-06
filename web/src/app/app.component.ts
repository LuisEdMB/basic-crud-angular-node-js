import { Component, OnInit } from '@angular/core';
import { AuthorInterface } from '../types/author-interface'
import { AuthorService } from '../services/author-service'
import { MatDialog } from '@angular/material/dialog'
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  columns: String[] = ['name', 'birth', 'options']
  authors: AuthorInterface[] = []

  constructor(private authorService: AuthorService,
    private modal: MatDialog){ }

  ngOnInit() {
    this.authorService.getAuthors().subscribe((result: AuthorInterface[]) => {
      this.authors = result
    })
  }

  showModal(id: string) {
    const modalAuthor = this.modal.open(ModalComponent, {
      data: id,
      disableClose: true
    });
    modalAuthor.afterClosed().subscribe();
  }

  disableAuthor(id: string) {
    this.authorService.disableAuthor(id).subscribe(_ => { this.ngOnInit() })
  }

  enableAuthor(id: string) {
    this.authorService.enableAuthor(id).subscribe(_ => { this.ngOnInit() })
  }
}
