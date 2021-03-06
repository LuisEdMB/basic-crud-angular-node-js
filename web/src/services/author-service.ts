import { Injectable } from '@angular/core'
import { gql, Apollo } from 'apollo-angular'
import { map } from 'rxjs/operators';
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
            `
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
            `
        }).valueChanges.pipe(map((result:any) => result.data?.author || null))
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