import { injectable } from "inversify";

export interface CookieProvider {
  set(key: string, value: string, timeoutInMinutes?: number): void;
  get(key: string, defaultValue?: string): string;
  has(key: string): boolean;
  delete(key: string): void;
}

@injectable()
export class CookieProviderImpl implements CookieProvider {
  public set(key: string, value: string, timeoutInMinutes: number = 60): void {
    const date = new Date();
    date.setTime(date.getTime() + timeoutInMinutes * 60 * 60 * 1000);

    document.cookie = key + " = " + value + "; expires = " + date.toISOString();
  }

  public get(key: string, defaultValue?: string): string {
    const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
    if (match) return match[2];

    return defaultValue || "";
  }

  public has(key: string): boolean {
    return this.get(key) ? true : false;
  }

  public delete(key: string): void {
    this.set(key, "", -1);
  }
}
