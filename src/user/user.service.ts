import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const passwordHashed = await hash(userDto.password, saltOrRounds);

    return await this.userRepository.save({
      ...userDto,
      typeUser: 1,
      password: passwordHashed,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
