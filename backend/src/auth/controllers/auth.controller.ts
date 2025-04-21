import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Unprotected } from 'nest-keycloak-connect';
import { LoginRequest } from '../requests/login.request';
import { RenewTokenRequest } from '../requests/renew-token.request';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Unprotected()
  @HttpCode(HttpStatus.OK)
  public async auth(@Body() request: LoginRequest) {
    try {
      return await this.authService.auth(request.username, request.password);
    } catch {
      return HttpStatus.UNAUTHORIZED;
    }
  }

  @Post('refresh-token')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  public async renewToken(@Body() request: RenewTokenRequest) {
    try {
      return await this.authService.renewToken(request.refreshToken);
    } catch {
      return HttpStatus.UNAUTHORIZED;
    }
  }
}
