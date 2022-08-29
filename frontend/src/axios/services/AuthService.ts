import api from '../axios';

export default class AuthService {
  static async login(email: string, password: string) {
    return api.post('/auth/login', { email, password });
  }

  static async register(email: string, password: string) {
    return api.post('/auth/register', { email, password });
  }

  static async logout() {
    return api.post('/auth/login');
  }
}
