import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AddonModule } from './addon/addon.module';
import { BrandModule } from './brand/brand.module';
import { DatabaseModule } from './database/database.module'

@Module({
  controllers: [AppController],
  imports: [UserModule, AddonModule, BrandModule, DatabaseModule.forRoot()],
})
export class AppModule {}
