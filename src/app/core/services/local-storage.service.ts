import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {
  set(key: string, data: any) {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }

    localStorage.setItem(key, data);
  }

  get<T>(key: string) {
    const data = localStorage.getItem(key);

    try {
      return JSON.parse(data);
    } catch (e) {
      return localStorage.getItem(key);
    }
  }

  unset(key: string) {
    localStorage.removeItem(key);
  }
}
