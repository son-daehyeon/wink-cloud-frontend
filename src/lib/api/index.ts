import Auth from '@/lib/api/domain/auth';
import Record from '@/lib/api/domain/record';
import Request from '@/lib/api/request';

export default class Api {
  private static instance: Api | null = null;

  private readonly request = new Request();

  private readonly domain = {
    Auth: new Auth(this.request),
    Record: new Record(this.request),
  };

  private constructor() {
    Api.instance = this;
  }

  private static get Instance(): Api {
    if (Api.instance === null) {
      Api.instance = new Api();
    }

    return Api.instance!;
  }

  public static get Domain() {
    return Api.Instance.domain;
  }

  public static get Request(): Request {
    return Api.Instance.request;
  }
}
