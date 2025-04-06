import { Module } from '@nestjs/common';
import { KeycloakService } from './keycloak.service';

@Module({
  imports: [],
  providers: [KeycloakService],
  exports: [KeycloakService],
})
export class KeycloakModule {}
