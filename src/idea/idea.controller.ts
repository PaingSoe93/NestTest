import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { create } from 'domain';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('api/ideas')
export class IdeaController {
  constructor(private ideaService: IdeaService) {}

  @Get()
  findAll() {
    return this.ideaService.showAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ideaService.readOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: IdeaDTO) {
    return this.ideaService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() data: Partial<IdeaDTO>) {
    return this.ideaService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ideaService.destroy(id);
  }
}
