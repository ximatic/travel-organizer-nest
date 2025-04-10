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

import { TokenGuard } from '../../token/guards/token.guard';
import { AuthService } from '../services/auth.service';

import { AuthToken } from '../models/auth-token.model';

import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<AuthToken> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(TokenGuard)
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
  @UseGuards(TokenGuard)
  async verifyToken(@Req() request: Request): Promise<AuthToken> {
    return this.authService.verifyToken(request['accessToken']);
  }

  //   @Post('refresh')
  //   refreshToken(): Promise<AuthToken> {
  //     return this.authService.refreshToken();
  //   }

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
