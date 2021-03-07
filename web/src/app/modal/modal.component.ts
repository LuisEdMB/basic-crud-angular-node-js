import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AuthorService } from 'src/services/author-service'
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Book } from 'src/types/author';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  authorForm: FormGroup

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private authorService: AuthorService,
    private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.authorForm = this.formbuilder.group({
      name: [''],
      birth: [''],
      books: this.formbuilder.array([])
    })
    this.getAuthor()
  }

  getAuthor() {
    if (this.data)
      this.authorService.getAuthor(this.data).subscribe(author => {
          this.authorForm.patchValue(author)
          let books = (this.authorForm.get('books') as FormArray)
          author.books.forEach((book: Book) => {
            books.push(this.createBookRow(book.title, book.abstract, book.year))
          })
      })
  }

  addBook() {
    let books = (this.authorForm.get('books') as FormArray)
    books.push(this.createBookRow('', '', 0))
  }

  createBookRow(title: string, abstract: string, year: number){
    return this.formbuilder.group({
      title: [title],
      abstract: [abstract],
      year: [year]
    })
  }

  removeBook(index: number) {
    let books = (this.authorForm.get('books') as FormArray)
    books.removeAt(index)
  }

  close() {
    this.dialogRef.close()
  }

  save() {
    if (this.data) 
      this.authorService.updateAuthor(this.data, this.authorForm.value).subscribe(_ => {
        this.close()
      })
    else
      this.authorService.saveAuthor(this.authorForm.value).subscribe(_ => {
        this.close()
      })
  }
}
