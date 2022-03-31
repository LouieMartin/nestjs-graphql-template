import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MessagesModule } from './messages/messages.module';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd() + 'src/schema.gql'),
      playground: process.env.NODE_ENV === 'production' ? false : true,
      subscriptions: {
        'subscriptions-transport-ws': true,
      },
    }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'family-chat-db',
      logging: true,
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      entities: ['dist/**/*.entity.{ts,js}'],
    }),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
