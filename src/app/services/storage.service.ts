import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'src/assets/angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  async getFromLocal(key) {
    console.log('key is - ' + key);
    console.log('returning - ' + JSON.stringify(this.storage.get(key)));
    return this.storage.get(key);
  }

  async saveInLocal(key, val) {
    this.storage.set(key, val);
  }

  async clearAll() {
    localStorage.clear();
  }

}
