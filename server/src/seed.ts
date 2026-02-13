import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Game } from './games/entities/game.entity';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Game],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  const repo = dataSource.getRepository(Game);

  const filePath = path.join(__dirname, '..', 'games.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const games = JSON.parse(raw) as any[];

  // insert in small batches to avoid "too many SQL variables"
  const BATCH_SIZE = 20;

  for (let i = 0; i < games.length; i += BATCH_SIZE) {
    const slice = games.slice(i, i + BATCH_SIZE);
    const entities = slice.map((g) => repo.create(g as Game));
    await repo.save(entities);
  }

  await dataSource.destroy();
}

seed()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding failed', err);
    process.exit(1);
  });
