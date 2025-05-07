import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AccessToken } from '../../token/schemas/access-token.schema';

import { UserRole } from '../../user/models/user.enum';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request['accessToken'] || !request['accessToken'].user) {
      throw new UnauthorizedException();
    }

    if ((request['accessToken'] as AccessToken).user.role !== UserRole.Admin) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
