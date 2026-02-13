import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async getGames(page = 1, limit = 20, search?: string) {
    const take = Math.max(1, Math.min(limit, 100));
    const skip = (Math.max(page, 1) - 1) * take;

    const where =
      search && search.trim().length > 0
        ? [
            { name: ILike(`%${search}%`) },
            { provider: ILike(`%${search}%`) },
            { gameStudio: ILike(`%${search}%`) },
          ]
        : undefined;

    const [items, total] = await this.gamesRepository.findAndCount({
      where,
      skip,
      take,
      order: { name: 'ASC' },
    });

    return {
      items,
      total,
      page,
      limit: take,
    };
  }
}
