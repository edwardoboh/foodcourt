import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { success } from 'src/common/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signup(@Body() user: CreateUserDto) {
    // TODO - Encrypt user password here before saving
    const resp = await this.authService.signup(user);
    return success(resp)
  }
}
