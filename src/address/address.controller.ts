import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { ReturnAddressDto } from './dtos/returnAddress.dto';
import { DeleteResult } from 'typeorm';
import { AddressEntity } from './entities/address.entity';
import { UpdateAddressDto } from './dtos/updateAddress.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Public()
  @Post(':userId')
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @Param('userId') userId: number,
  ) {
    return this.addressService.createAddress(createAddressDto, userId);
  }

  @Public()
  @Get()
  async findAll(): Promise<ReturnAddressDto[]> {
    const addresses = await this.addressService.findAll();
    return addresses.map((address) => new ReturnAddressDto(address));
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ReturnAddressDto> {
    const address = await this.addressService.findById(id);
    return new ReturnAddressDto(address);
  }

  @Public()
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.addressService.delete(id);
  }

  @Public()
  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() data: UpdateAddressDto,
    @Param('id') id: number,
  ): Promise<AddressEntity> {
    return this.addressService.update(id, data);
  }
}
