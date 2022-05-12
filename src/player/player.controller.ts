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
import { PlayerDTO } from './dtos/create-player.dto';
import { UpdateplayerDto } from './dtos/update-player.dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body(new ValidationPipe()) playerDTO: PlayerDTO) {
    await this.playerService.create(playerDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }

  @Get()
  async findAll(@Query() paginateSortDto: PaginateDto): Promise<any> {
    console.log('paging', paginateSortDto);
    return this.playerService.findAll(paginateSortDto);
  }

  @Get('playerByTeam/:team')
  async findAllByTeam(
    @Param('team') team: string,
    @Query() paginateSortDto: PaginateDto,
  ): Promise<any> {
    console.log('paging', paginateSortDto, team);
    return this.playerService.findAllByTeam(team, paginateSortDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDTO: UpdateplayerDto) {
    return this.playerService.update(updateDTO, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerService.deleteOne(id);
  }
}
