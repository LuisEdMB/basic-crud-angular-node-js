import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../services/author-service'
import { MatDialog } from '@angular/material/dialog'
import { ModalComponent } from './modal/modal.component';
import { Author } from 'src/types/author';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  columns: string[] = ['name', 'birth', 'options']
  authors: Author[] = []

  constructor(private authorService: AuthorService,
    private modal: MatDialog){ }

  ngOnInit() {
    this.authorService.getAuthors().subscribe((result: Author[]) => {
      this.authors = result
    })
  }

  showModal(id: string) {
    const modalAuthor = this.modal.open(ModalComponent, {
      data: id,
      width: '100%',
      disableClose: true
    });
    modalAuthor.afterClosed().subscribe(_ => { this.ngOnInit() });
  }

  disableAuthor(id: string) {
    this.authorService.disableAuthor(id).subscribe(_ => { this.ngOnInit() })
  }

  enableAuthor(id: string) {
    this.authorService.enableAuthor(id).subscribe(_ => { this.ngOnInit() })
  }
}
