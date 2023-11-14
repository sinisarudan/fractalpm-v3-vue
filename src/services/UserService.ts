import http from '@/http-common';
import { type Person } from '@/models/users/users-vos';
import { UserOperators } from '@/models/users/user-operators';

interface Config {
  LOCAL_MOCKUP_DATA: boolean;
}

let config: Config = { LOCAL_MOCKUP_DATA: true };

export const setConfig = (newConfig: Config) => {
  config = newConfig;
};

export class UserService {

  static register(user: Person): Promise<Person> {
    if(config.LOCAL_MOCKUP_DATA) {
      user.id = UserOperators.PersonMock.id;
      return Promise.resolve(user);
    } else {
      return http.post('/register', user);
    }
  }

  static login(user: Person): Promise<Person> {
    if(config.LOCAL_MOCKUP_DATA) {
      user.id = UserOperators.PersonMock.id;
      return Promise.resolve(user);
    } else {
      return http.post('/login', user);
    }
  }
}
