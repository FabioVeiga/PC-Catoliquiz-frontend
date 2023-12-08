import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  static key = '7061737323313233';
  // public static isAdmin = StorageService.getAdmin();

  public static obj = {
    get isAdmin() {
      return StorageService.getAdmin();
    },
  };

  public static setUsuario(user: any) {
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(JSON.stringify(user)),
      this.key
    );
    localStorage.setItem('A1xJoEHv0v', encrypted.toString());
    this.setToken(user.access_Token.token);
  }

  public static getUsuario(): any {
    if (localStorage.getItem('A1xJoEHv0v') === null) {
      return null;
    }
    const decrypted = CryptoJS.AES.decrypt(
      localStorage.getItem('A1xJoEHv0v') || '{}',
      this.key
    );
    const stringdecrypt = decrypted.toString(CryptoJS.enc.Utf8);
    const user = JSON.parse(stringdecrypt);
    return user;
  }

  public static deleteUsuario() {
    localStorage.removeItem('A1xJoEHv0v');
    localStorage.removeItem('jsadvjr23');
  }

  public static setToken(at: string) {
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(at),
      this.key
    );
    sessionStorage.setItem('jsadvjr23', encrypted.toString());
  }

  public static getToken(): any {
    let token = sessionStorage.getItem('jsadvjr23');
    if (!token) {
      return this.getUsuario()?.auth_token;

      if (!token) return null;
    }
    const decrypted = CryptoJS.AES.decrypt(token, this.key);
    const stringdecrypt = decrypted.toString(CryptoJS.enc.Utf8);
    const code = stringdecrypt;
    return code;
  }

  public static getName(): any {
    const user = this.getUsuario();
    if (user != null) {
      return user.name;
    }
    return null;
  }

  public static getAdmin(): boolean {
    return false; //TO-DO: Ajustar regra do ADMIN.
    const user = this.getUsuario();
    if (user != null) {
      return user.admin;
    }
    return false;
  }

  public static getLogon(): any {
    const user = this.getUsuario();
    if (user != null) {
      return user.logon;
    }
    return null;
  }

  public static getIdTime(): any {
    const user = this.getUsuario();
    if (user != null) {
      return user.idTime;
    }
    return null;
  }

  public static setCode(code: any) {
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(code),
      this.key
    );
    localStorage.setItem('2SBzg4BGm2', encrypted.toString());
  }

  public static getCode(): any {
    if (localStorage.getItem('2SBzg4BGm2') === null) {
      return null;
    }
    const decrypted = CryptoJS.AES.decrypt(
      localStorage.getItem('2SBzg4BGm2') || '{}',
      this.key
    );
    const stringdecrypt = decrypted.toString(CryptoJS.enc.Utf8);
    const code = stringdecrypt;
    return code;
  }
}
