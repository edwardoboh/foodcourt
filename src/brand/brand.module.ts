import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { CheckBrandMiddleware } from 'src/addon/middleware/check-brand.middleware';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService]
})
export class BrandModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckBrandMiddleware).forRoutes('brands/:brandId/addon-categories', )
  }
}
