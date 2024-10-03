import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';
import { UpdateAddressDto } from './dtos/updateAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findById(userId);
    await this.cityService.findById(createAddressDto.cityId);

    return this.addressRepository.save({
      ...createAddressDto,
      userId,
    });
  }

  async findAll(): Promise<AddressEntity[]> {
    return await this.addressRepository.find();
  }

  async findById(id: number): Promise<AddressEntity> {
    const address = await this.addressRepository.findOne({
      where: { id },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return this.addressRepository.delete(id);
  }

  async update(id: number, data: UpdateAddressDto): Promise<AddressEntity> {
    const product = await this.findById(id);

    if (!product) {
      throw new NotFoundException('Address not found');
    }

    return this.addressRepository.save({
      ...product,
      ...data,
    });
  }
}
