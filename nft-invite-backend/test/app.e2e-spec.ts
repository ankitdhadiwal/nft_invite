// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { App } from 'supertest/types';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication<App>;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });


import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Repository } from 'typeorm';
import { InviteCode } from '../src/entities/invite-code.entity';
import { Collection } from '../src/entities/collection.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('NFT Invite Flow (e2e)', () => {
  let app: INestApplication;
  let inviteRepo: Repository<InviteCode>;
  let collectionRepo: Repository<Collection>;

  const testWallet = 'stars1faf3zz3nkw0n80t02a03wh5s2uvr5j0dhw6eh7';
  const testContract = 'stars1t2kc70u75h05vxq93xe4avm3msaptwt5efmjgsfats67l85v5d2sz4q2yl';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    inviteRepo = moduleFixture.get(getRepositoryToken(InviteCode));
    collectionRepo = moduleFixture.get(getRepositoryToken(Collection));

    // Clean up old data
    await inviteRepo.clear();
    await collectionRepo.clear();

    // Seed a test collection and invite code
    await collectionRepo.save({ address: testContract });
    await inviteRepo.save({ code: 'TESTCODE123', used: false });
  });

  it('should return an invite code for eligible wallet', async () => {
    const res = await request(app.getHttpServer()).get(
      `/auth/check-nft/${testWallet}`,
    );

    expect(res.status).toBe(200);
    expect(res.body.inviteCode).toBeDefined();
    expect(typeof res.body.inviteCode).toBe('string');
  });

  it('should not return a new code for the same wallet (duplicate prevention)', async () => {
    const res = await request(app.getHttpServer()).get(
      `/auth/check-nft/${testWallet}`,
    );

    expect(res.status).toBe(200);
    expect(res.body.inviteCode).toBe('TESTCODE123');
  });

  it('should return not eligible for wallet with no NFT', async () => {
    const res = await request(app.getHttpServer()).get(
      `/auth/check-nft/stars1nonownertest`,
    );

    expect(res.status).toBe(200);
    expect(res.body.error).toBe('Not eligible');
  });

  afterAll(async () => {
    await app.close();
  });
});
