import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UrlDto } from './dto/url.dto';
import { UrlService } from './url.service';

@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post('/shorten')
  async shorten(@Body() url: UrlDto) {
    return await this.urlService.shortenUrl(url.longUrl);
  }

  @Get(':code')
  async redirect(@Param('code') code: string, @Res() res: Response) {
    const longUrl = await this.urlService.redirectUrl(code);
    return res.redirect(longUrl);
  }
}
