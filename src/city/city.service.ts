import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async findAllCitiesById(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache(`state_${stateId}`, () => {
      return this.cityRepository.find({
        where: {
          stateId,
        },
      });
    });
  }

  async findById(id: number): Promise<CityEntity> {
    const user = await this.cityRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('City not found');
    }

    return user;
  }
}
