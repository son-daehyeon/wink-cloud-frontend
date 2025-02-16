import Request from '@/lib/api/request';
import { KeyPairResponse } from '@/lib/api/type/domain/util/key_pair';

export default class KeyPair {
  constructor(private readonly request: Request) {}

  public async generate(): Promise<KeyPairResponse> {
    return this.request.post('/util/key-pair');
  }
}
