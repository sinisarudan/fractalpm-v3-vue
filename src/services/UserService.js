import http from '@/http-common';
import Person from '@/models/users/Person';

/**
 * Misc Mockups for `UserService` testing and demoing
 * @class
 */
export class UserServiceMockups {
  /**
   * a list for saving registered users:
   * @type {Person[]}
   */
  registeredUsers = [];

  /**
   * a max id:
   * @type {number}
   */
  static MAX_ID = 1;

  /**
   *  @type {UserServiceMockups}
   * The singleton instance of UserServiceMockups.
   */
  static instance;

  /**
   * Static factory method to get the singleton instance of UserServiceMockups.
   * @returns {UserServiceMockups}
   */
  static getInstance () {
    if (!UserServiceMockups.instance) {
      UserServiceMockups.instance = new UserServiceMockups();
    }
    return UserServiceMockups.instance;
  }
}

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
   * @returns {(Promise<Person> | undefined)} A `Promise` that resolves to the registered user or to `undefined` if there was an error in logging in.
   */
  static register (user) {
    if (UserService.config.LOCAL_MOCKUP_DATA) {
      const mockupInstance = UserServiceMockups.getInstance();

      // check if user with this email is already registered:
      const foundIndex = mockupInstance.registeredUsers.findIndex((regUser) => regUser.email === user.email);
      if (foundIndex > -1) {
        console.warn(`[UserService:: register] User with email '${user.email} already registered'`, mockupInstance.registeredUsers[foundIndex]);
        return Promise.resolve(undefined);
      }
      user.id = mockupInstance.MAX_ID++;
      mockupInstance.registeredUsers.push(user);
      return Promise.resolve(user);
    } else {
      return http.post('/register', user);
    }
  }

  /**
  * Login a user.
  * @param {Person} user - The user to log in.
  * @returns {(Promise<Person> | undefined) } a user with full data that is found through `user` login info or `undefined` if user is not found among registered.
  */
  static login (user) {
    if (UserService.config.LOCAL_MOCKUP_DATA) {
      // TODO: add logic for retrieving a pre-saved (registered) demo user (with all his data: firstName, ...)
      // user.id = Person.PersonMock.id;
      const mockupInstance = UserServiceMockups.getInstance();
      const foundIndex = mockupInstance.registeredUsers.findIndex((regUser) => regUser.email === user.email);
      if (foundIndex > -1) {
        const foundUser = mockupInstance.registeredUsers[foundIndex];
        if (foundUser.password === user.password) {
          return Promise.resolve(foundUser);
        } else {
          console.warn(`[UserService:: login] User with email '${user.email}: passwords don't match`);
        }
      } else {
        console.warn(`[UserService:: login] User with email '${user.email} not found among registered ones'`, user.userWoPass);
        return Promise.resolve(undefined);
      }
    } else {
      return http.post('/login', user);
    }
  }
}
