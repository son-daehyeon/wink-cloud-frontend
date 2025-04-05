import ApiResponse from '@/lib/api/type/api-response';
import { UserResponse } from '@/lib/api/type/domain/user';
import { useTokenStore } from '@/lib/store/token';
import { useUserStore } from '@/lib/store/user';

export default class Request {
  private readonly baseUrl?: string;

  private token: string | null = null;

  public constructor() {
    this.baseUrl = typeof window === 'undefined' ? process.env.API_URL : window.origin;
  }

  public async setToken(token: string): Promise<boolean> {
    this.token = token;

    const response = await this.get<UserResponse>('/auth/me');

    if (!response) {
      this.removeToken();
    } else {
      useUserStore.getState().setUser(response.user);
      useTokenStore.getState().save({ token });
      return true;
    }

    return false;
  }

  public removeToken() {
    this.token = null;

    useUserStore.getState().setUser(null);
  }

  // ############################################################

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response: ApiResponse<T> = await (
      await fetch(`${this.baseUrl}/api${url}`, options)
    ).json();

    if (response.error === '액세스 토큰이 만료되었습니다.') {
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

    if (this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }

    if (body && body instanceof FormData) {
      headers.delete('Content-Type');
    }

    return headers;
  }
}
