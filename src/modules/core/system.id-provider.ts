import { IIDProvider } from '@ratatouille/modules/core/id-prover';
import { nanoid } from 'nanoid';

export class SystemIdProvider implements IIDProvider {
  generate(): string {
    return nanoid();
  }
}
