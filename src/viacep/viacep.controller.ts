import { Controller, Get, Param } from '@nestjs/common';
import { ViaCepService } from './viacep.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('viacep')
export class ViaCepController {
  constructor(private readonly ViaCepService: ViaCepService) {}

  @Public()
  @Get(':cep')
  async findAddressByCep(@Param('cep') cep: string) {
    return await this.ViaCepService.findAddressByCep(cep);
  }
}
