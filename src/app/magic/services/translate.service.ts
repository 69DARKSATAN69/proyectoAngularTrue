import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private API_KEY = '2f5c291917msh74e56bd645ab6a5p1f09e3jsn737d58ff8d2a';
  private BASE_URL = 'https://text-translator2.p.rapidapi.com/translate';
  constructor(private http: HttpClient) {}

  translate(keyword: string) {
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': this.API_KEY,
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
    };
    const body = new URLSearchParams({
      source_language: 'en',
      target_language: 'ja',
      text: keyword,
    });
    return this.http
      .post(this.BASE_URL, body, { headers })
      .pipe(map((translateData: any) => translateData.data));
  }
}
