import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class ViaCepService {
  URL_API_VIACEP = process.env.URL_CEP_COREIOS;
  constructor(private readonly httpService: HttpService) {}

  async findAddressByCep(cep: string): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef
      .get(this.URL_API_VIACEP.replace('{CEP}', cep))
      .then((result) => {
        if (result.data.error === 'true') {
          throw new NotFoundException('CEP not found');
        }
        return result.data;
      })
      .catch((error: AxiosError) => {
        throw new BadRequestException(
          `Error in connection request ${error.message}`,
        );
      });
  }
}
