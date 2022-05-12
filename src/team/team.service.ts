import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginateDto } from 'src/common/dtos/paginate-sort-dto';
import { LeagueService } from 'src/league/league.service';
import { CreateTeamDTO } from './dtos/create.dto';
import { UpdateDto } from './dtos/update.dto';
import { Team, TeamDocument } from './schema/team.schema';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    private leagueService: LeagueService,
  ) {}

  async create(teamDTO: CreateTeamDTO): Promise<Team> {
    const newTeam = new this.teamModel(teamDTO);
    return newTeam.save();
  }

  async findOne(id: string): Promise<Team> {
    const teamId = await this.teamModel.findOne({ id });
    if (!teamId) {
      throw new HttpException(
        `Team with id ${teamId} Not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.teamModel.findById({ _id: id }).exec();
  }

  async findAll(paginateDTO: PaginateDto): Promise<any> {
    const count: number = await this.teamModel.countDocuments().exec();
    const docs: Team[] = await this.teamModel
      .find()
      .skip(paginateDTO.skip)
      .limit(paginateDTO.limit)
      .sort({ [paginateDTO.sortBy]: paginateDTO.sortOrder })
      .exec();
    return { count, docs };
  }
  async findAllByLeague(league: any, paginateDTO: PaginateDto): Promise<any> {
    const count: number = await this.teamModel
      .countDocuments({ league })
      .exec();
    const docs: Team[] = await this.teamModel
      .find({ league })
      .skip(paginateDTO.skip)
      .limit(paginateDTO.limit)
      .sort({ [paginateDTO.sortBy]: paginateDTO.sortOrder })
      .exec();
    return { count, docs };
  }

  async update(updateDTO: UpdateDto, id: string): Promise<Team> {
    const teamId = await this.teamModel.findOne({ id });
    if (!teamId) {
      throw new HttpException(
        `Team with ${teamId} Not Found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.teamModel
      .findByIdAndUpdate(id, { ...updateDTO }, { useFindAndModify: false })
      .exec();
  }

  async deleteOne(id: string): Promise<Team> {
    const teamId = await this.teamModel.findOne({ id });
    if (!teamId) {
      throw new HttpException(
        `Team with ${teamId} Not Found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.teamModel.findById({ _id: id }).exec();
  }
}
