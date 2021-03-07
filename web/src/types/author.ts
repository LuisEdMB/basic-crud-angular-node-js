import { Injectable } from "@angular/core"

@Injectable()
export class Author {
    id: string
    name: string
    birth: string
    active: boolean
    books: Book[]
    constructor(id:string, name: string, birth: string, active: boolean, books: Book[]) {
        this.id = id
        this.name = name
        this.birth = birth
        this.active = active
        this.books = books
    }
}

@Injectable()
export class Book {
    id: string
    title: string
    abstract: string
    year: number
    constructor(id: string, title: string, abstract: string, year: number) {
        this.id = id
        this.title = title
        this.abstract = abstract
        this.year = year
    }
}