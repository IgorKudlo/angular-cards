import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  login(credentials: { email: string; password: string; rememberMe: boolean }) {
    return this.http.post<{
      accessToken: 'string';
    }>('https://api.flashcards.andrii.es/v1/auth/login', { user: credentials });
  }
}
