import ApiResponse from '@/lib/api/type/api-response';
import { LoginResponse } from '@/lib/api/type/domain/auth';
import { UserResponse } from '@/lib/api/type/domain/user';
import { useTokenStore } from '@/lib/store/token';
import { useUserStore } from '@/lib/store/user';

export default class Request {
  private readonly baseUrl?: string;

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  public constructor() {
    this.baseUrl = typeof window === 'undefined' ? process.env.API_URL : window.origin;
  }

  public async setToken(accessToken: string, refreshToken: string): Promise<boolean> {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    const response = await this.get<UserResponse>('/auth/me');

    if (!response) {
      this.removeToken();
    } else {
      useUserStore.getState().setUser(response.user);
      useTokenStore.getState().save({ accessToken, refreshToken });
      return true;
    }

    return false;
  }

  public removeToken() {
    this.accessToken = null;
    this.refreshToken = null;

    useUserStore.getState().setUser(null);
  }

  private async refresh(token: string): Promise<boolean> {
    try {
      const { accessToken, refreshToken } = await this.post<LoginResponse>('/auth/refresh-token', {
        token,
      });

      await this.setToken(accessToken, refreshToken);

      return true;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      this.removeToken();

      return false;
    }
  }

  // ############################################################

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response: ApiResponse<T> = await (
      await fetch(`${this.baseUrl}/api${url}`, options)
    ).json();

    if (response.error === '액세스 토큰이 만료되었습니다.') {
      const token = this.refreshToken!;

      if (!(await this.refresh(token))) return null as T;

      const headers = options.headers as Headers;
      headers.set('Authorization', `Bearer ${this.accessToken}`);

      return this.request(url, {
        ...options,
        headers,
      });
    }

    if (url === '/auth/me' && response.error === '인증에 실패하였습니다.') {
      this.removeToken();
      return null as T;
    }

    if (response.error) {
      throw new Error(response.error);
    }

    return response.content!;
  }

  public async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
    return this.request(url, {
      method: 'GET',
      headers: this.generateHeaders(),
      ...options,
    });
  }

  public async post<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'POST',
      body: this.generateBody(body),
      headers: this.generateHeaders(body),
    });
  }

  public async put<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'PUT',
      body: this.generateBody(body),
      headers: this.generateHeaders(body),
    });
  }

  public async patch<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'PATCH',
      body: this.generateBody(body),
      headers: this.generateHeaders(body),
    });
  }

  public async delete<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'DELETE',
      body: this.generateBody(body),
      headers: this.generateHeaders(body),
    });
  }

  // ############################################################

  private generateBody(body?: object | FormData): string | FormData | null {
    if (!body) {
      return null;
    }

    if (body instanceof FormData) {
      return body;
    }

    return JSON.stringify(body);
  }

  private generateHeaders(body?: object | FormData): Headers {
    const headers = new Headers();

    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    if (this.accessToken) {
      headers.set('Authorization', `Bearer ${this.accessToken}`);
    }

    if (body && body instanceof FormData) {
      headers.delete('Content-Type');
    }

    return headers;
  }
}
