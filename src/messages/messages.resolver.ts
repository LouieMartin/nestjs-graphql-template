import { MessagesService } from './messages.service';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Message } from './message.entity';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Subscription(() => Message, {
    name: 'newMessage',
  })
  newMessage() {
    return pubSub.asyncIterator('newMessage');
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('sender') sender: string,
    @Args('text') text: string,
  ): Promise<Message> {
    const newMessage = this.messagesService.sendMessage(sender, text);
    pubSub.publish('newMessage', { newMessage });
    return newMessage;
  }

  @Query(() => [Message])
  async messages(): Promise<Message[]> {
    return this.messagesService.findAll();
  }
}
