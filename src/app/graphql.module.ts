import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';

const uri = 'http://localhost:4000'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  const accept = setContext((op, ctx) => ({
    headers: new HttpHeaders().set('Accept', 'charset=utf-8')
  }));
  const auth = setContext((op, ctx) => ({
    headers: ctx.headers.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkZWZhdWx0QGRlZmF1bHQiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTQxMzAxMDA3LCJleHAiOjE1NDE5MDU4MDd9.aFvPbYZuK-NTMIxqsi8PfaHbxjSU1FJkX4EUWdF0arc'
    )
  }));
  return {
    link: ApolloLink.from([accept, auth, httpLink.create({ uri })]),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
