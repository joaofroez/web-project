import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCharacterCommand } from '../impl/create-character.command';
import { Character } from '../../models/character.model';

@CommandHandler(CreateCharacterCommand)
export class CreateCharacterHandler implements ICommandHandler<CreateCharacterCommand> {
  constructor(
    @InjectModel(Character)
    private readonly characterModel: typeof Character,
  ) {}

  async execute(command: CreateCharacterCommand) {
    return this.characterModel.create(command.data as any);
  }
}
