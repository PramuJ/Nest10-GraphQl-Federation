


import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
 
class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  // willSendRequest({ request, context }) {

  //   console.log(request.variables)
  //   // console.log(JSON.stringify(request,null, 2))
  //   // console.log(context)
  //   // Forward the Authorization token if present
 
  //   // request.http.headers.set('user-id');
 
  //   if (context.authToken) {
  //     request.http.headers.set('Authorization', context.authToken);
  //   }
  //   // Pass other necessary headers
  //   if (context.userId) {
  //     request.http.headers.set('user-id', context.userId);
  //   }
  // }
}
 
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        // cors: true,
        context: ({ req }) => ({
          
          // 'content-type': 'application/json',
          // 'header-key': 'pramuditha',
          // 'user-agent':
          //   'PostmanClient/11.13.1 (AppId=d3f22ad3-5b4c-4d49-ae4e-35f846e41ce9)',
          // 'x-shared-data': 'token ayyoob',
          // 'host': 'localhost:3000',
          // 'content-length': '242',
          // 'connection': 'keep-alive',
          // shared: req.headers['x-shared-data'],
          req
        }),
 

      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'employees', url: 'http://localhost:3000/graphql' },
          { name: 'projects', url: 'http://localhost:3002/graphql' },
          { name: 'locations', url: 'http://localhost:3001/graphql' },
          // { name: 'locations-nest8', url: 'http://localhost:4001/graphql' }
          ],
        }),

        buildService({ url }) {
          
          const allowedHeaders = ['custom-header']; // to allow selected headers 

          return new AuthenticatedDataSource({
            url,
            willSendRequest({ context, request }) {
              const incommingHeaders = context?.req?.headers;
              console.log(incommingHeaders)
              if (incommingHeaders) {

                // for (const header of allowedHeaders) {
                //   const value = incommingHeaders[header];
                //   if (value) request.http.headers.set(header, value);
                //   console.log(value)


                // allowedHeaders.map( (header) => {
                //   const value = incommingHeaders[header]
                //   if (value) request.http.headers.set(header, value);
                // })
                for (var header in incommingHeaders) {
                  if (incommingHeaders.hasOwnProperty(header)) {
                    const value = incommingHeaders[header]
                    console.log(value)

                    request.http.headers.set(header,value);
                    
                  }
                }

                const token = context.req.headers.authorization || ''; // Extract JWT token
                request.http.headers.set('Authorization', token); // Forward JWT token







                
              }
              // enable this later once all correlationIds are implemented
              //  request.http.headers.set('x-correlationId', `GW-${uuidv4()}`);
            },
          });
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
