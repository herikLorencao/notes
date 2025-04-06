export class AuthResponse {
  accessToken: string;
  refreshToken: string;

  constructor(params: Partial<AuthResponse>) {
    this.accessToken = params.accessToken ?? '';
    this.refreshToken = params.refreshToken ?? '';
  }
}
