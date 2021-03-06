import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AuthorService } from 'src/services/author-service';
import { AuthorInterface } from 'src/types/author-interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  author: AuthorInterface = null

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private authorService: AuthorService) { }

  ngOnInit() {
    this.authorService.getAuthor(this.data).subscribe((result: AuthorInterface) => {
      this.author = result
    })
  }

  onClose() {
    this.dialogRef.close()
  }
}
