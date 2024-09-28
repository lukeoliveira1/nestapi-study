import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/:stateId')
  async findAllCitiesById(@Param('stateId') stateId: number) {
    return await this.cityService.findAllCitiesById(stateId);
  }
}
