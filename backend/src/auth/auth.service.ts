import { Injectable } from '@nestjs/common';
import { AuthResponse } from './responses/auth.response';
import { firstValueFrom, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async auth(username: string, password: string) {
    const request = this.http.post(
      `${process.env.KEYCLOAK_SERVER}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      new URLSearchParams({
        client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
        client_secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
        grant_type: 'password',
        username,
        password,
      }),
    );

    const response = await firstValueFrom(request);
    console.log(response);
    return of(new AuthResponse());
  }
}
