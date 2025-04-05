import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'nest-keycloak-connect';
import { AuthRequest } from './requests/auth.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  public async auth(@Body() request: AuthRequest) {
    try {
      return await this.authService.auth(request.username, request.password);
    } catch {
      return HttpStatus.UNAUTHORIZED;
    }
  }
}
