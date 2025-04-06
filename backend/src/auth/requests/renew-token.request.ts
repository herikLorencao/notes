import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RenewTokenRequest {
  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;
}
