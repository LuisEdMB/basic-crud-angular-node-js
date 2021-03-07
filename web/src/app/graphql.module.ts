import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { onError } from "@apollo/client/link/error"
import { environment } from '../environments/environment'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      alert(message)
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    })
  if (networkError) {
    alert('An error has ocurred on server ...')
    console.log(`[Network error]: ${networkError}`)
  }
})

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: errorLink.concat(httpLink.create({ uri: environment.url_graphql })),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})

export class GraphQLModule {}
