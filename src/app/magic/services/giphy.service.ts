import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private API_KEY = 'uduIa1uiLn6fy1fnQZVXFUJ1mf9oBU0U';
  private BASE_URL = 'https://api.giphy.com/v1/gifs';
  constructor(private http: HttpClient) {}

  searchGiphy(keyword: string) {
    const url = `${this.BASE_URL}/search?api_key=${this.API_KEY}&q=${keyword}&limit=20&offset=0&rating=g&lang=en`;
    return this.http.get(url).pipe(map((gifData: any) => gifData.data));
  }
}
