import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PaginateDto } from 'src/common/dtos/paginate-sort-dto';
import { LeagueDTO } from './dtos/league-dto';
import { LeagueService } from './league.service';

@Controller('league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Post()
  async create(@Body(new ValidationPipe()) leagueDTO: LeagueDTO) {
    await this.leagueService.create(leagueDTO);
  }

  @Get()
  async findAll(@Query() paginateSortDto: PaginateDto): Promise<any> {
    console.log('paging ', paginateSortDto);
    return this.leagueService.findAll(paginateSortDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leagueService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDTO: LeagueDTO) {
    return this.leagueService.update(updateDTO, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leagueService.deleteOne(id);
  }
}
