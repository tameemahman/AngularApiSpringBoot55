import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../service/book.service';
import { error } from 'console';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{
  books: Book[] = [];
  newBook : Book = {authorName:'',title:''};

  selectedBook: Book| null= null;

  constructor (private bookService : BookService){}

  ngOnInit(): void {
    this.loadBooks(); //for load this section first so we write this here

  }

  loadBooks(): void{
    this.bookService.getAllBooks().subscribe({

      next:(data) => {
        this.books = data;
      },
      error:(error) => {
        console.error(error);
      }
    });
  }
  addBook(): void{
    this.bookService.addBook(this.newBook).subscribe({
      next:(data)=>{
        this.books.push(data);
        this.newBook={authorName:'',title:''};
      },
      error:(error) =>{
        console.error(error);
      }
    });
  }

  updateBook(book: Book): void {
    this.bookService.updateBook(book).subscribe({
      next: (updatedBook) => {
        const index = this.books.findIndex(b => b.id === updatedBook.id);
        if (index !== -1) {
          this.books[index] = updatedBook;
        }
        this.selectedBook=null;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
deleteBook(id: number | undefined): void{
if(id !==undefined){
  this.bookService.deleteBook(id).subscribe({
    next:() => {
      this.books = this.books. filter(b => b.id !==id);
    },
    error:(error) =>{
      console.error(error);
    }
  });
} else{
  console.error('Invalid Book ID');
}
}

setSelectedBook(book: Book): void{
  this.selectedBook = {...book}; //Make a copy to avoid mutating the original
}

}
