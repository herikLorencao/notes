import { Injectable } from '@nestjs/common';
import { AuthResponse } from './responses/auth.response';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async auth(username: string, password: string) {
    const response = await firstValueFrom(
      this.http.post(
        `${process.env.KEYCLOAK_SERVER}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
          client_secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
          grant_type: 'password',
          username,
          password,
        }),
      ),
    );
    return new AuthResponse({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    });
  }

  async renewToken(refreshToken: string) {
    const response = await firstValueFrom(
      this.http.post(
        `${process.env.KEYCLOAK_SERVER}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
          client_secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      ),
    );
    return new AuthResponse({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    });
  }
}
