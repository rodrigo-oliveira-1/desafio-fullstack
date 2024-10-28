import axios from 'axios';
import LocalStorageService from './localStorageService';

class ApiService {
  constructor() {
    this.axios = axios.create(
      {
        baseURL: 'http://api:3030'
      }
    );

    this.axios.interceptors.request.use(async (config) => {
      // Token padrao para todas requisicoes
      const token = LocalStorageService.getToken();
      config.headers['x-access-token'] = `${token}`;
      return config;
    });

    this.axios.interceptors.response.use(async (response) => {
      return response;
    }, async (error) => {
      if (error.response.status === 401) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    });
  }

  login(email, password) {
    return this.axios.post('/signin',
      {
        userEmail: email,
        userPass: password
      });
  }

  // signIn({
  //   nome,
  //   sobrenome,
  //   email,
  //   password
  // }) {
  //   return this.axios.post('/signin',
  //     {
  //       nome,
  //       sobrenome,
  //       email,
  //       senha: password
  //     });
  // }

  getUsers(queryString) {
    return this.axios.get('/users', {
      params: {
        q: queryString
      }
    });
  }

  getUser(userId) {
    return this.axios.get(`/users/${userId}`);
  }

  saveUser({
    name,
    email,
    cpf,
    password,
    passwordCheck,
    bornDate,
    street,
    number,
    neighborhood,
    reference,
    city,
    state,
    zipCode,
  }) {
    return this.axios.post('/users',
      {
        name,
        email,
        cpf,
        password,
        passwordCheck,
        bornDate,
        street,
        number,
        neighborhood,
        reference,
        city,
        state,
        zipCode
      });
  }

  updateUser({
    id,
    name,
    bornDate,
    status,
    street,
    number,
    neighborhood,
    reference,
    city,
    state,
    zipCode
  }) {
    return this.axios.put(`/users/${id}`,
      {
        id,
        status,
        name,
        bornDate,
        street,
        number,
        neighborhood,
        reference,
        city,
        state,
        zipCode
      });
  }

  save(userRecord) {
    if (userRecord.id) {
      return this.updateUser(userRecord);
    }

    return this.saveUser(userRecord);
  }

  removeUser(id) {
    return this.axios.delete(`/users/${id}`);
  }
}

export default ApiService;
