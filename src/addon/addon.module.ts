import { Module } from "@nestjs/common";
import { AddonService } from "./addon.service";
import { AddonController } from "./addon.controller";
import { BrandModule } from "src/brand/brand.module";
import AddonModel from "src/database/models/addon.model";

@Module({
    controllers: [AddonController],
    providers: [AddonService],
    imports: [BrandModule, AddonModel]
})
export class AddonModule {}