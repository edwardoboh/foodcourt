import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AddonService } from "./addon.service";
import { AddonController } from "./addon.controller";
import { BrandModule } from "src/brand/brand.module";
import AddonModel from "src/database/models/addon.model";
import { CheckBrandMiddleware } from "./middleware/check-brand.middleware";

@Module({
    controllers: [AddonController],
    providers: [AddonService],
    imports: [BrandModule, AddonModel]
})
export class AddonModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckBrandMiddleware).forRoutes(AddonController)
    }
}