import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InviteCode } from '../entities/invite-code.entity';
import { Collection } from '../entities/collection.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Controller('auth')
export class NftCheckController {
  constructor(
    @InjectRepository(InviteCode)
    private inviteCodeRepo: Repository<InviteCode>,
    @InjectRepository(Collection)
    private collectionRepo: Repository<Collection>,
  ) {}

  @Get('check-nft/:walletAddress')
  async checkNft(@Param('walletAddress') walletAddress: string) {
    const collections = await this.collectionRepo.find();

    for (const collection of collections) {
      try {
        const query = {
          tokens: {
            owner: walletAddress,
          },
        };

        const base64Query = Buffer.from(JSON.stringify(query)).toString('base64');
        
        const url = `https://rest.stargaze-apis.com/cosmwasm/wasm/v1/contract/${collection.address}/smart/${base64Query}`;
        
        // Alternative: POST request method
        // const url = `https://rest.stargaze-apis.com/cosmwasm/wasm/v1/contract/${collection.address}/smart`;
        
        const res = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        });
        

       // const tokens = res.data.tokens || res.data.data?.tokens;
       const tokens = res.data.data?.tokens || res.data.tokens;


        if (tokens && tokens.length > 0) {
          const alreadyClaimed = await this.inviteCodeRepo.findOne({
            where: { claimedByWallet: walletAddress },
          });

          if (alreadyClaimed) {
            return { inviteCode: alreadyClaimed.code };
          }

          const availableCode = await this.inviteCodeRepo.findOne({
            where: { used: false },
          });

          if (availableCode) {
            availableCode.used = true;
            availableCode.claimedByWallet = walletAddress;
            await this.inviteCodeRepo.save(availableCode);
            return { inviteCode: availableCode.code };
          } else {
            return { error: 'No more invite codes left.' };
          }
        }
      } catch (err) {
        console.error(`❌ Error checking collection ${collection.address}`, {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
        continue;
      }
    }

    return { error: 'Not eligible' };
  }
}   