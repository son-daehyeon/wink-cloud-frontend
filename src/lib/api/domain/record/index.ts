import Request from '@/lib/api/request';
import {
  CreateRecordRequest,
  GetRecordResponse,
  GetRecordsResponse,
  UpdateRecordRequest,
} from '@/lib/api/type/domain/record';

export default class Record {
  constructor(private readonly request: Request) {}

  public async getRecords(): Promise<GetRecordsResponse> {
    return this.request.get('/record');
  }

  public async createRecord(data: CreateRecordRequest): Promise<GetRecordResponse> {
    return this.request.post('/record', data);
  }

  public async updateRecord(
    recordId: string,
    data: UpdateRecordRequest,
  ): Promise<GetRecordResponse> {
    return this.request.put(`/record/${recordId}`, data);
  }

  public async deleteRecord(recordId: string): Promise<void> {
    return this.request.delete(`/record/${recordId}`);
  }
}
