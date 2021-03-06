export interface AuthorInterface {
    id: string,
    name: string,
    birth: string,
    active: Boolean,
    books: BookInterface[]
}

interface BookInterface {
    id: string,
    title: string,
    abstract: string,
    year: Number
}