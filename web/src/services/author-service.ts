import { Injectable } from '@angular/core'
import { gql, Apollo } from 'apollo-angular'
import { map } from 'rxjs/operators';
import { Author } from 'src/types/author';
import { Utils } from 'src/utils';
import * as Consts from '../consts'

@Injectable()
export class AuthorService {
    constructor(private apollo: Apollo, private utils: Utils) { }
    
    getAuthors() {
        return this.apollo.watchQuery({
            query: gql`
                query getAuthors {
                    authors {
                        id
                        name
                        birth
                        active
                    }
                }
            `,
            fetchPolicy: 'network-only'
        })
        .valueChanges.pipe(map((result:any) => 
            this.utils.convertToDateFormatStringFromArray(result.data?.authors || [], 'birth', 'dd/MM/yyyy')))
    }

    getAuthor(id: string) {
        return this.apollo.watchQuery({
            query: gql`
                query getAuthor {
                    author(id: "${id}") {
                        name
                        birth
                        active
                        books {
                            id
                            title
                            abstract
                            year
                        }
                    }
                }
            `,
            fetchPolicy: 'network-only'
        }).valueChanges.pipe(map((result:any) => result.data?.author || null))
    }

    saveAuthor(author: Author) {
        return this.apollo.mutate({
            mutation: gql`
                mutation createAuthor($author: AuthorInput!) {
                    createAuthor(author: $author) {
                        id
                    }
                }
            `,
            variables: {
                author: author
            }
        })
    }

    updateAuthor(id: string, author: Author) {
        return this.apollo.mutate({
            mutation: gql`
                mutation updateAuthor($id: ID!, $author: AuthorInput!) {
                    updateAuthor(id: $id, author: $author) {
                        id
                        name
                        birth
                        active
                        books {
                            id
                            title
                            abstract
                            year
                        }
                    }
                }
            `,
            variables: {
                id,
                author: {
                    name: author.name,
                    birth: author.birth,
                    books: author.books,
                    process: Consts.process.UPDATE
                }
            }
        })
    }

    disableAuthor(id: string) {
        return this.apollo.mutate({
            mutation: gql`
                mutation disableAuthor($id: ID!, $author: AuthorInput!) {
                    updateAuthor(id: $id, author: $author) {
                        id
                        active
                    }
                }
            `,
            variables: {
                id,
                author: {
                    process: Consts.process.DISABLE
                }
            }
        })
    }

    enableAuthor(id: string) {
        return this.apollo.mutate({
            mutation: gql`
                mutation disableAuthor($id: ID!, $author: AuthorInput!) {
                    updateAuthor(id: $id, author: $author) {
                        id
                        active
                    }
                }
            `,
            variables: {
                id,
                author: {
                    process: Consts.process.ENABLE
                }
            }
        })
    }
}