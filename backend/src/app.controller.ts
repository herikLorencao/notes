import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Unprotected } from 'nest-keycloak-connect';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiBearerAuth()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('public')
  @Unprotected()
  getHelloPublic(): string {
    return this.appService.getHello();
  }
}
