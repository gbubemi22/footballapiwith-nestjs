import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginateDto } from 'src/common/dtos/paginate-sort-dto';
import { TeamService } from 'src/team/team.service';
import { PlayerDTO } from './dtos/create-player.dto';
import { UpdateplayerDto } from './dtos/update-player.dto';
import { Player, PlayerDocument } from './schema/player.schema';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    private teamService: TeamService,
  ) {}

  async create(playerDTO: PlayerDTO): Promise<Player> {
    const newPlayer = new this.playerModel(playerDTO);
    return newPlayer.save();
  }

  async findOne(id: string): Promise<Player> {
    const playerId = await this.playerModel.findOne({ id });
    if (!playerId) {
      throw new HttpException(
        `Player with id ${playerId} Not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.playerModel.findById({ _id: id }).exec();
  }

  async findAll(paginateDTO: PaginateDto): Promise<any> {
    const count: number = await this.playerModel.countDocuments().exec();
    const docs: Player[] = await this.playerModel
      .find()
      .skip(paginateDTO.skip)
      .limit(paginateDTO.limit)
      .sort({ [paginateDTO.sortBy]: paginateDTO.sortOrder })
      .exec();
    return { count, docs };
  }
  async findAllByTeam(team: any, paginateDTO: PaginateDto): Promise<any> {
    const count: number = await this.playerModel
      .countDocuments({ team })
      .exec();
    const docs: Player[] = await this.playerModel
      .find({ team })
      .skip(paginateDTO.skip)
      .limit(paginateDTO.limit)
      .sort({ [paginateDTO.sortBy]: paginateDTO.sortOrder })
      .exec();
    return { count, docs };
  }

  async update(updateDTO: UpdateplayerDto, id: string): Promise<Player> {
    const playerId = await this.playerModel.findOne({ id });
    if (!playerId) {
      throw new HttpException(
        `Player with ${playerId} Not Found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.playerModel
      .findByIdAndUpdate(id, { ...updateDTO }, { useFindAndModify: false })
      .exec();
  }

  async deleteOne(id: string): Promise<Player> {
    const playerId = await this.playerModel.findOne({ id });
    if (!playerId) {
      throw new HttpException(
        `Player with ${playerId} Not Found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.playerModel.findById({ _id: id }).exec();
  }
}
