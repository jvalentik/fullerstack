import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from '@fullerstack/nsx-prisma';
import { UserModule } from '@fullerstack/nsx-user';

import { appConfiguration } from './app.config';
import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration],
    }),
    PrismaModule,
    UserModule,
    GraphQLModule.forRoot(environment.graphqlOptions),
  ],
  controllers: [AppController],
  providers: [ConfigService, AppService, UserModule],
})
export class AppModule {}
