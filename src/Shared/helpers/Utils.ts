import { format, formatDistance } from 'date-fns';
import { injectable, inject } from 'inversify';
import { validateErrorFormMessage } from 'Shared/constants/validateErrorMessage';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { UserRole } from 'Shared/constants/userRole';

export interface Util {
  isValidEmail(email: string): boolean;
  isValidPhoneNumber(value: string): boolean;
  isValidPassword(value: string): boolean;
  formatPhoneNumber(phoneNumberString: string): string | null;
  formatString(value: string, variables: object): string;
  formatDate(value: string, format?: string): string;
  formatDistanceDate(fromDate: string, toDate: Date): string;
  randomString(length: number): string;
  isValidNumber(number: any): boolean;
  isPositiveNumber(number: number): boolean;
  isNonAsciiChars(value: string): boolean;
  formatNumberWithComma(value: any): string;
  pluralize(value: any): string;
  loadScript(src: string, id: string): any;
  removeScript(id: string): any;
  cognitoMessage(type: string): string;
  getUrlParams(stringParam: any): object;
  getAllCookieKeys(): string[];
  clearAllCookie(): void;
  replaceRole(role: string, lowercase?: boolean, adminName?: string): string;
}

@injectable()
export class UtilImpl implements Util {
  constructor(
    @inject('cookieProvider') private readonly cookieProvider: CookieProvider
  ) {}

  /**
   *
   * @param {number} value
   */
  public convertByteToMegaByte(value: number): number {
    return value / 1000000;
  }

  public isValidNumber(number: any): boolean {
    return !isNaN(number);
  }

  public isPositiveNumber(number: number): boolean {
    return number > 0;
  }

  public isValidEmail(email: string) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    return !(reg.test(email) === false);
  }

  /**
   * Validate phone number
   * @param {String} value
   */
  public isValidPhoneNumber(value: string) {
    const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return !(reg.test(value) === false);
  }

  /**
   * Validate password
   * @param {String} value
   */
  public isValidPassword(value: string) {
    return value.length >= 6;
  }

  public formatPhoneNumber(phoneNumberString: string) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }

    return null;
  }

  public formatString(value: string, variables: object) {
    if (!value) {
      return '';
    }

    return value.replace(/(\{\w+\})|(\:\w+)/g, (match: any) => {
      return variables[match.replace(/\{|\}|\:/g, '')] || '';
    });
  }

  public formatDate(value: Date | string, formatStr: string = 'MMM dd, yyyy') {
    if (!value) {
      return '';
    }
    return format(new Date(value), formatStr);
  }

  public formatDistanceDate(fromDate: string, toDate: Date = new Date()) {
    if (!fromDate) {
      return '';
    }
    return formatDistance(new Date(fromDate), toDate, { addSuffix: true });
  }

  public randomString(length: number): string {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  public isNonAsciiChars(value: string): boolean {
    if (!value) {
      return false;
    }

    return !/^[ -~\n]+$/.test(value);
  }

  public formatNumberWithComma(value: any, defaultValue?: any): string {
    if (!value) {
      return defaultValue !== undefined ? defaultValue : '0';
    }

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  public pluralize(value: any): string {
    const len = !isNaN(value) ? value : value.length;

    return len > 1 ? 's' : '';
  }

  public loadScript(src: string, id: string) {
    const tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    tag.className = id;
    document.body.appendChild(tag);
  }

  public removeScript(id: string) {
    const elementId = document.getElementsByClassName(id);
    if (elementId) {
      for (let i = 0; i < elementId.length; i++) {
        elementId[i].remove();
      }
    }
  }

  public cognitoMessage(type: string): string {
    switch (type) {
      case validateErrorFormMessage['login/type']:
        return validateErrorFormMessage['login/message'];

      case validateErrorFormMessage['login/type/password']:
        return validateErrorFormMessage['login/password/message'];

      case validateErrorFormMessage['register/type']:
        return validateErrorFormMessage['register/message'];

      default:
        return validateErrorFormMessage['another/message'];
    }
  }

  public getUrlParams(stringParam: any): object {
    const result = {};
    const params = (stringParam.split('?')[1] || '').split('&');
    for (const param in params) {
      if (params.hasOwnProperty(param)) {
        const paramParts = params[param].split('=');
        result[paramParts[0]] = decodeURIComponent(paramParts[1] || '');
      }
    }
    return result;
  }

  public getAllCookieKeys(): string[] {
    const allCookies = document.cookie.split(';');
    const result = [];

    for (const keyCookie in allCookies) {
      const item = allCookies[keyCookie];
      const splitItem = item.split('=');
      const nameCookie = splitItem[0];
      result.push(nameCookie.trim());
    }

    return result;
  }

  public clearAllCookie(): void {
    const cookieKeys = this.getAllCookieKeys();
    this.cookieProvider.multiDelete(cookieKeys);
  }

  public replaceRole(
    role: string,
    lowercase: boolean = false,
    adminName: string = ''
  ): string {
    if (role === UserRole.CLIENT_USER) {
      return lowercase
        ? UserRole.CLIENT_STANDARD.toLowerCase()
        : UserRole.CLIENT_STANDARD;
    }

    if (adminName) {
      return lowercase ? adminName.toLowerCase() : adminName;
    }

    return lowercase
      ? UserRole.CLIENT_ADMINISTRATOR.toLowerCase()
      : UserRole.CLIENT_ADMINISTRATOR;
  }
}
