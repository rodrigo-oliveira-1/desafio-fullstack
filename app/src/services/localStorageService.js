const USER_KEY = '@user';
const TOKEN_KEY = '@token';

class LocalStorageService {
  static setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static getUser() {
    const rawUser = localStorage.getItem(USER_KEY);
    return rawUser ? JSON.parse(rawUser) : {};
  }

  static setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  static getToken() {
    return String(localStorage.getItem(TOKEN_KEY));
  }

  static isAutenticated() {
    const token = LocalStorageService.getToken();
    return token && token !== 'false';
  }

  static logout() {
    LocalStorageService.setToken(false);
    LocalStorageService.setUser(null);
  }
}

export default LocalStorageService;
