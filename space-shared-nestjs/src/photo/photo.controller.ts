import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Photo } from 'src/models/photo.model';
import { PhotoService } from './photo.service';

@ApiTags('Photos')
@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @ApiCreatedResponse({ type: [Photo] })
  @Get()
  findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  @ApiCreatedResponse({ type: Photo })
  @Post()
  async create(@Body() photo: Photo): Promise<Photo> {
    const newPhoto = await this.photoService.create(photo);

    return newPhoto;
  }
}
