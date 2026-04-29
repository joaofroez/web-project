import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CdcService } from './cdc.service';

@Controller()
export class CdcController {
  private readonly logger = new Logger(CdcController.name);

  constructor(private readonly cdcService: CdcService) {}

  @MessagePattern('pg.public.events')
  async handleEventChange(@Payload() message: any) {
    const payload = this.extractPayload(message);
    if (payload) await this.cdcService.processEventChange(payload);
  }

  @MessagePattern('pg.public.characters')
  async handleCharacterChange(@Payload() message: any) {
    const payload = this.extractPayload(message);
    if (payload) await this.cdcService.processCharacterChange(payload);
  }

  @MessagePattern('pg.public.character_versions')
  async handleCharacterVersionChange(@Payload() message: any) {
    const payload = this.extractPayload(message);
    if (payload) await this.cdcService.processCharacterVersionChange(payload);
  }

  @MessagePattern('pg.public.event_participants')
  async handleEventParticipantChange(@Payload() message: any) {
    const payload = this.extractPayload(message);
    if (payload) await this.cdcService.processEventParticipantChange(payload);
  }

  private extractPayload(message: any) {
    let payload = message;
    if (message && message.payload !== undefined) {
      payload = message.payload;
    }
    if (!payload || !payload.op) {
      this.logger.warn('Mensagem recebida sem estrutura válida do Debezium, ignorando...');
      return null;
    }
    return payload;
  }
}
