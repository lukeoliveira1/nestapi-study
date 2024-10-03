import { Module } from '@nestjs/common';
import { ViaCepService } from './viacep.service';
import { ViaCepController } from './viacep.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ViaCepService],
  controllers: [ViaCepController],
})
export class ViaCepModule {}
