import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { create } from 'domain';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';
import { userInfo } from 'os';

@Controller('api/ideas')
export class IdeaController {
  private logger = new Logger('IdeaController');

  constructor(private ideaService: IdeaService) {}

  private logData(options: any) {
    options.user && this.logger.log('USER ' + JSON.stringify(options.user));
    options.data && this.logger.log('DATA ' + JSON.stringify(options.data));
    options.id && this.logger.log('ID ' + JSON.stringify(options.id));
  }

  @Get()
  findAll() {
    return this.ideaService.showAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ideaService.readOne(id);
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  create(@User('id') user, @Body() data: IdeaDTO) {
    this.logData({ user, data });
    return this.ideaService.create(user, data);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @User('id') user,
    @Body() data: Partial<IdeaDTO>,
  ) {
    this.logData({ id, user, data });
    return this.ideaService.update(id, user, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  delete(@Param('id') id: string, @User('id') user) {
    this.logData({ id, user });
    return this.ideaService.destroy(id, user);
  }
}
