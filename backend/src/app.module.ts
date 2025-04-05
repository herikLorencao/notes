import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { ConfigModule } from './config/config.module';
import { KeycloakService } from './config/keycloak/keycloak.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakService,
      imports: [ConfigModule],
    }),
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
