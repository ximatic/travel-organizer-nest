import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../service/auth.service';

import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/sign-up.dto';

import { UserProfile } from '../../users/schema/user-profile.schema';
import { AuthToken } from '../model/auth-token.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<AuthToken> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  logout(@Req() request: Request): void {
    try {
      this.authService.logout(request['accessToken']);
    } catch {
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }
  }

  @Get('verify')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async verifyToken(@Req() request: Request): Promise<AuthToken> {
    return this.authService.verifyToken(request['accessToken']);
  }

  //   @Post('refresh')
  //   refreshToken(): Promise<AuthToken> {
  //     return this.authService.refreshToken();
  //   }

  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Req() request: Request): Promise<UserProfile> {
    return this.authService.getProfile(request['accessToken']);
  }

  @Post('signup')
  signup(@Body() signUpDto: SignUpDto): Promise<AuthToken> {
    if (signUpDto.password !== signUpDto.passwordRepeat) {
      throw new BadRequestException(
        `Provided passwords are not the same. Please try again later.`,
      );
    }

    return this.authService.signup(signUpDto);
  }
}
