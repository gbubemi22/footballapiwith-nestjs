import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeagueDTO } from './dtos/league-dto';
import { League, LeagueDocument } from './schema/league.schema';
import { PaginateDto } from 'src/common/dtos/paginate-sort-dto';

@Injectable()
export class LeagueService {
  constructor(
    @InjectModel(League.name) private LeagueModel: Model<LeagueDocument>,
  ) {}
  // CREATE LEAGUE
  async create(leagueDTO: LeagueDTO): Promise<League> {
    const newLeague = new this.LeagueModel(leagueDTO);
    return newLeague.save();
  }
  // GET ALL LEAGUE
  async findAll(paginateDTO: PaginateDto): Promise<any> {
    const count: number = await this.LeagueModel.countDocuments().exec();
    const docs: League[] = await this.LeagueModel.find()
      .skip(paginateDTO.skip)
      .limit(paginateDTO.limit)
      .sort({ [paginateDTO.sortBy]: paginateDTO.sortOrder })
      .exec();
    return { count, docs };
  }

  async findOne(id: string): Promise<League> {
    const user = await this.LeagueModel.findOne({ id });
    if (!user) {
      throw new HttpException(
        `User with id ${id} Not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.LeagueModel.findById({ _id: id }).exec();
  }

  // UPDATE LEAGUE
  async update(leagueDTO: LeagueDTO, id: string): Promise<League> {
    return this.LeagueModel.findByIdAndUpdate(
      id,
      { ...leagueDTO },
      { useFindAndModify: false },
    ).exec();
  }
  // DELETE LEAGUE
  async deleteOne(id: string): Promise<League> {
    const user = await this.LeagueModel.findOne({ id });
    if (!user) {
      throw new HttpException('User Not found', HttpStatus.BAD_REQUEST);
    }

    return await this.LeagueModel.findByIdAndRemove({ _id: id }).exec();
  }
}

//TO ADD MORE SECURITY...
