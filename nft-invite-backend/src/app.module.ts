import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';

import { Collection } from './entities/collection.entity';
import { InviteCode } from './entities/invite-code.entity';

import { NftCheckController } from './auth/nft-check.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,     // Time window in seconds
          limit: 5, 
        },
      ],
    }),

  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [Collection, InviteCode],
    synchronize: true,
  }),

  TypeOrmModule.forFeature([Collection, InviteCode]),
],
  controllers: [AppController, AdminController, NftCheckController],
  providers: [AppService, AdminService],
})
export class AppModule {}
