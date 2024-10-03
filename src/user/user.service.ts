import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const user = await this.findByEmail(userDto.email).catch(() => undefined);

    if (user) {
      throw new BadGatewayException('Email already in use');
    }

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

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByIdUsingRelations(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
