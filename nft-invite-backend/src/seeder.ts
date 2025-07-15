import { DataSource } from 'typeorm';
import { InviteCode } from './entities/invite-code.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [InviteCode],
  synchronize: false,
});

async function importInviteCodes() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(InviteCode);
  const results: string[] = [];

  const csvPath = path.join(__dirname, '..', 'codes.csv');

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (data) => results.push(data.code))
    .on('end', async () => {
      for (const code of results) {
        const exists = await repo.findOne({ where: { code } });
        if (!exists) {
          const invite = repo.create({ code, used: false });
          await repo.save(invite);
        }
      }

      console.log('✅ Invite codes imported');
      process.exit(0);
    });
}

importInviteCodes();
