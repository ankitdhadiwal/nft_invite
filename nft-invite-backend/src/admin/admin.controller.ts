import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('collections')
  async addCollection(@Body('address') address: string) {
    return this.adminService.addCollection(address);
  }
}
