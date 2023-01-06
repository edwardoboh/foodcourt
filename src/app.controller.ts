import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  serverHealth(): string {
    return "Server Healthy!";
  }
}
