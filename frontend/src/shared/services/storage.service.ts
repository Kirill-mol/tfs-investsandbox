import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class StorageService {
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    
    if (item) {
      try {
        const parseItem = JSON.parse(item);
        
        return parseItem;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    return null;
  }

  setItem(key: string, value: any) {
    const parseItem = JSON.stringify(value);

    localStorage.setItem(key, parseItem);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}