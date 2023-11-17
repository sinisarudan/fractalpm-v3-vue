import http from '@/http-common';
import Person from '@/models/users/Person';

/**
 * Configuration options.
 * @class
 */
export class Config {
  /**
   * if `true`: mocking up; if `false`: using axis service -> backend:
   * @type {boolean}
   */
  LOCAL_MOCKUP_DATA;

  constructor (configObj = ConfigDefault) {
    /**
     * if `true`: mocking up; if `false`: using axis service -> backend:
     * @type {boolean}
     */
    this.LOCAL_MOCKUP_DATA = configObj.LOCAL_MOCKUP_DATA;
  }
}

/**
 * @type {Config}
 */
export const ConfigDefault = { LOCAL_MOCKUP_DATA: true };

/**
 * providing (server-oriented) services for Users
 * @class
 */
export class UserService {
  /**
   * @type {Config}
   */
  static config = ConfigDefault;

  /**
   * Register a user.
   * @param {Person} user - The user to register.
   * @returns {Promise<Person>} A promise that resolves to the registered user.
   */
  static register (user) {
    if (UserService.config.LOCAL_MOCKUP_DATA) {
      user.id = Person.PersonInit;
      return Promise.resolve(user);
    } else {
      return http.post('/register', user);
    }
  }

  /**
  * Login a user.
  * @param {Person} user - The user to log in.
  * @returns {Promise<Person>} A promise that resolves to the logged-in user.
  */
  static login (user) {
    if (UserService.config.LOCAL_MOCKUP_DATA) {
      // TODO: add logic for retrieving a pre-saved (registered) demo user (with all his data: firstName, ...)
      user.id = Person.PersonMock.id;
      return Promise.resolve(user);
    } else {
      return http.post('/login', user);
    }
  }
}
