import { Module } from '@nestjs/common';
import { KeycloakService } from './keycloak/keycloak.service';

@Module({
  imports: [],
  providers: [KeycloakService],
  exports: [KeycloakService],
})
export class ConfigModule {}
