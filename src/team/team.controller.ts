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
import { CreateTeamDTO } from './dtos/create.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body(new ValidationPipe()) teamDTO: CreateTeamDTO) {
    await this.teamService.create(teamDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Get()
  async findAll(@Query() paginateSortDto: PaginateDto): Promise<any> {
    console.log('paging', paginateSortDto);
    return this.teamService.findAll(paginateSortDto);
  }

  @Get('teamByLeague/:league')
  async findAllByLeague(
    @Param('league') league: string,
    @Query() paginateSortDto: PaginateDto,
  ): Promise<any> {
    console.log('paging', paginateSortDto, league);
    return this.teamService.findAllByLeague(league, paginateSortDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDTO: CreateTeamDTO) {
    return this.teamService.update(updateDTO, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.deleteOne(id);
  }
}
