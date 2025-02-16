import Auth from '@/lib/api/domain/auth';
import Project from '@/lib/api/domain/project';
import Instance from '@/lib/api/domain/project/instance';
import InstanceMatrix from '@/lib/api/domain/project/instance/matrix';
import InstanceStatus from '@/lib/api/domain/project/instance/status';
import User from '@/lib/api/domain/user';
import KeyPair from '@/lib/api/domain/util/key_pair';
import Request from '@/lib/api/request';

export default class Api {
  private static instance: Api | null = null;

  private readonly request = new Request();

  private readonly domain = {
    User: new User(this.request),
    Auth: new Auth(this.request),
    Project: {
      Index: new Project(this.request),
      Instance: {
        Index: new Instance(this.request),
        Matrix: new InstanceMatrix(this.request),
        Status: new InstanceStatus(this.request),
      },
    },
    Util: {
      KeyPair: new KeyPair(this.request),
    },
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
