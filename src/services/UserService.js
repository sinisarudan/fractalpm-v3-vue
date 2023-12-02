import http from '@/http-common';
import Person from '@/models/users/Person';
import { ServerResponse, ServerResponseCode } from './ServerResponse';

export const ServerResponseUserServiceCode = {
  ...ServerResponseCode,
  EMAIL_EXISTS: 'EMAIL_EXISTS'
};

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
export const ConfigDefault = { LOCAL_MOCKUP_DATA: false };

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
   * signup a user.
   * @param {Person} user - The user to signup.
   * @param {boolean} [sendConfirmationEmail = true] - if true, the confirmation email is created (default: true).
   * @returns {(Promise<ServerResponse>)} A `Promise` that resolves to the ServerResponse, containing signed up user or an error info.
   */
  static async signup (user, sendConfirmationEmail = true) {
    // TODO: add specific error codes and returning those to callers or throwing exception to be caught
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
      // TODO: to see if we want to cover `sendConfirmationEmail` in the mock up
      return Promise.resolve(user);
    } else {
      // TODO: to see if we want to complicate things on backend with the conditional `sendConfirmationEmail` or always to perform it
      /**
       * @type {Promise<ServerResponse>}
       */
      let response;
      try {
        /**
         * @type {ServerResponse}
         */
        response = await http.post('/signup', user);
        console.log(`[response=${response}`);
        return response.data;
      } catch (error) {
        // Handle error, including 400 Bad Request
        if (error.response) {
          // The request was made, and the server responded with a status code
          console.warn('Response status:', error.response.status);
          console.warn('Response data:', error.response.data);

          if (error.response.data.code === 'EMAIL_EXISTS') {
            console.warn('EMAIL_EXISTS');
          }
          return error.response.data;
        } else if (error.request) {
          // The request was made, but no response was received
          console.log('No response received');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error during request setup:', error.message);
        }
        return new ServerResponse(ServerResponseCode.ERROR_REQUEST, false);
      }
    }
  }

  /**
  * Login a user.
  * @param {Person} user - The user to log in.
  * @returns {(Promise<Person> | undefined) } a user with full data that is found through `user` login info or `undefined` if user is not found among registered.
  */
  static async login (user) {
    if (UserService.config.LOCAL_MOCKUP_DATA) {
      // TODO: add specific error codes and returning those to callers or throwing exception to be caught
      // TODO: add logic for retrieving a pre-saved (registered) demo user (with all his data: first_name, ...)
      // user.id = Person.PersonMock.id;
      const mockupInstance = UserServiceMockups.getInstance();
      const foundIndex = mockupInstance.registeredUsers.findIndex((regUser) => regUser.email === user.email);
      if (foundIndex > -1) {
        const foundUser = mockupInstance.registeredUsers[foundIndex];
        if (foundUser.password === user.password) {
          return Promise.resolve(foundUser);
        } else {
          console.warn(`[UserService:: login] User with email '${user.email}: passwords don't match`);
          return Promise.resolve(undefined);
        }
      } else {
        console.warn(`[UserService:: login] User with email '${user.email} not found among registered ones'`, user.userWoPass);
        return Promise.resolve(undefined);
      }
    } else {
      try {
        const response = await http.post('/login', user);
        console.log(`[registeredUser=${response.data}`);
        return response.data;
      } catch (error) {
        // Handle error, including 400 Bad Request
        if (error.response) {
          // The request was made, and the server responded with a status code
          console.warn('Response status:', error.response.status);
          console.warn('Response data:', error.response.data);
        } else if (error.request) {
          // The request was made, but no response was received
          console.log('No response received');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error during request setup:', error.message);
        }
        return undefined;
      }
    }
  }

  /**
   * checks the validity of a code for a given phone number or email address.
   *
   * @param {string} uid - user uid
   * @param {string} token - The token to be validated.
   * @param {string} [password = undefined] - optional - if provided confirmation will also set password.
   * @returns {Promise<Person | undefined>} A promise that resolves to `Person` whose token is checked, otherwise to `undefined`.
   */
  static async confirmEmail (uid, token, password = undefined) {
    console.log(`[confirmEmail uid=${uid} ; token=${token}`);
    if (UserService.config.LOCAL_MOCKUP_DATA) {
      const DEMO_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbmlzYS5ydWRhbkBnbWFpbC5jb20iLCJleHAiOjE3MDE0NjI5MTZ9.Ahfwea2jKfHbqWaTdCfVS8vm3FLuW5eMTZW5VIBkeSo';

      if (token === DEMO_TOKEN) {
        return new Promise(resolve => setTimeout(() => resolve(Person.PersonInit), 1000));
      } else {
        return new Promise(resolve => setTimeout(() => resolve(undefined), 1000));
      }
    } else {
      try {
        const response = await http.get(`/check_confirm_email?uid=${uid}&token=${token}` + password ? `password=${password}` : '');
        console.log(`[confirmEmail user=${response.data}`);
        return response.data;
      } catch (error) {
        // Handle error, including 400 Bad Request
        if (error.response) {
          // The request was made, and the server responded with a status code
          console.warn('Response status:', error.response.status);
          console.warn('Response data:', error.response.data);
        } else if (error.request) {
          // The request was made, but no response was received
          console.log('No response received');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error during request setup:', error.message);
        }
        return undefined;
      }
    }
  }
}
