import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { GetAllWhatsappDto } from './dto/get-all-whatsapp.dto';
import { Message } from './entities/message.entity';

@Controller('/messages')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post()
  create(@Body() createWhatsappDto: CreateWhatsappDto): Promise<Message[]> {
    return this.whatsappService.create(createWhatsappDto);
  }

  @Post('/webhook')
  receive(@Body() hook: any): Promise<string> {
    return this.whatsappService.receive(hook);
  }

  @Get()
  findAll(@Query() params: GetAllWhatsappDto): Promise<Message[]> {
    return this.whatsappService.findAll(params);
  }
}
