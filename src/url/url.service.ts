import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isURL } from 'class-validator';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { Url } from './url.entity';

@Injectable()
export class UrlService {
  constructor(@InjectRepository(Url) private repo: Repository<Url>) {}

  async shortenUrl(longUrl: string): Promise<string> {
    try {
      if (!isURL(longUrl)) {
        throw new BadRequestException('URL invalid');
      }

      let url = await this.repo.findOneBy({ longUrl });
      if (url) {
        return url.shortUrl;
      }

      const shortCode = nanoid(5);
      const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
      url = await this.repo.create({
        shortCode,
        shortUrl,
        longUrl,
      });
      this.repo.save(url);
      return url.shortUrl;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async redirectUrl(shortCode: string): Promise<string> {
    try {
      const url = await this.repo.findOneBy({ shortCode });
      if (url) return url.longUrl;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Resource not found');
    }
  }
}
