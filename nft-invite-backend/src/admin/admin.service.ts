import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../entities/collection.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepo: Repository<Collection>,
  ) {}

  async addCollection(address: string) {
    const exists = await this.collectionRepo.findOne({ where: { address } });
    if (exists) {
      return { message: 'Collection already registered' };
    }

    const collection = this.collectionRepo.create({ address });
    await this.collectionRepo.save(collection);
    return { message: 'Collection registered successfully' };
  }
}
