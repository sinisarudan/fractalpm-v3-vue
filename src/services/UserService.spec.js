import { describe, test, expect, beforeEach, vi } from 'vitest';

// import { mount } from '@vue/test-utils'
import { UserService, Config } from '@/services/UserService';
import http from '@/http-common';
// import AxiosResponse from '@/http-common';
import Person from '@/models/users/Person';

// import { sum } from "../HelloWorld.vue";

describe('Config', () => {
  test('construction', () => {
    const config = new Config({ LOCAL_MOCKUP_DATA: true });
    expect(config.LOCAL_MOCKUP_DATA).toBeTruthy();
  });
});
describe('UserService', () => {
  beforeEach(() => {
    UserService.config = ({ LOCAL_MOCKUP_DATA: true });
    /*
      vi.mock("http", () => {
        return {
          default: {
            get: vi.fn().mockImplementation((type?: KNodeTypes) => {
              console.log("[http.get mocked called with: ]", type);
             return Musers;
            }),
          },
        };
      });
      // Set the mock call to GET to return a successful GET response
      // http.get.mockResolvedValue(Musers)
      */
  });
  // TODO: should be adjusted to the new login checks that require prior registering:
  test.todo('logins', async () => {
    const user = Person.PersonMock;
    user.entity_id = undefined;
    const userFromService = await UserService.login(user);
    expect(userFromService.entity_id).toBeDefined();
    expect(userFromService.email).toEqual(user.email);
  });
  test('register', async () => {
    const user = Person.PersonMock;
    user.entity_id = undefined;
    const userFromService = await UserService.signup(user);
    expect(userFromService.id).toBeDefined();
    expect(userFromService.email).toEqual(user.email);
  });
  test('register by spying http', async () => {
    UserService.config = ({ LOCAL_MOCKUP_DATA: false });
    // setting spy on `http.post` and mocking it so that it returns `PersonMock`
    // `http.post` is called by the `UserService.register`
    const getHttpGetSpy = vi.spyOn(http, 'post');
    getHttpGetSpy.mockResolvedValue({ data: Person.PersonMock });

    const result = await UserService.signup(Person.PersonMock);

    expect(getHttpGetSpy.mock.calls.length).toBe(1);
    expect(getHttpGetSpy).toHaveBeenCalled();
    expect(vi.isMockFunction(getHttpGetSpy)).toBe(true);
    console.log('getHttpGetSpy.mock.results[0].value', getHttpGetSpy.mock.results[0].value);
    expect(getHttpGetSpy.mock.results[0].value).toEqual({ data: Person.PersonMock });

    console.log('getHttpGetSpy.mock.calls', getHttpGetSpy.mock.calls);
    console.log('getHttpGetSpy.mock.results', getHttpGetSpy.mock.results);
    console.log('result', result);

    expect(result).toEqual(Person.PersonMock);
  });
});
