import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async sendMessage(sender: string, text: string): Promise<Message> {
    const newMessage = this.messageRepository.create({
      sender,
      text,
    });

    return this.messageRepository.save(newMessage);
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }
}
