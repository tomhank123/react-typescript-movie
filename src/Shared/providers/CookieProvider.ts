import { injectable } from 'inversify';

export interface CookieProvider {
  set(key: string, value: string, timeoutInMinutes?: number): void;
  get(key: string, defaultValue?: string): string;
  has(key: string): boolean;
  delete(key: string): void;
  multiDelete(keys: string[]): void;
}

@injectable()
export class CookieProviderImpl implements CookieProvider {
  public set(key: string, value: string, timeoutInMinutes: number = 60): void {
    const date = new Date();
    date.setTime(date.getTime() + timeoutInMinutes * 60 * 60 * 1000);
    document.cookie = `${key}=${value};expires=${date.toString()}`;
    if (timeoutInMinutes < 0) {
      this.eraseCookieFromAllPaths(key, date.toString());
    }
  }

  public eraseCookieFromAllPaths(name: string, time: string) {
    const pathBits = location.pathname.split('/');
    let pathCurrent = ' path=';

    document.cookie = name + '=; expires=' + time + ';';

    for (let i = 0; i < pathBits.length; i++) {
      pathCurrent += (pathCurrent.substr(-1) != '/' ? '/' : '') + pathBits[i];
      document.cookie = name + '=; expires=' + time + ';' + pathCurrent + ';';
    }
  }

  public get(key: string, defaultValue?: string): string {
    const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
    if (match) return match[2];

    return defaultValue || '';
  }

  public has(key: string): boolean {
    return this.get(key) ? true : false;
  }

  public delete(key: string): void {
    this.set(key, '', -1000);
  }

  public multiDelete(keys: string[]): void {
    for (const key of keys) {
      this.delete(key);
    }
  }
}
