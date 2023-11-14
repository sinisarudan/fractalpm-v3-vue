import { describe, it, test, expect, beforeEach, vi } from 'vitest'

// import { mount } from '@vue/test-utils'
import { UserService, setConfig } from '@/services/UserService';
import http from '@/http-common';
// import AxiosResponse from '@/http-common';
import type { Person } from '@/models/users/users-vos'
import { UserOperators } from '@/models/users/user-operators'

// import { sum } from "../HelloWorld.vue";

describe('UserService', () => {
  beforeEach(() => {
    setConfig({ LOCAL_MOCKUP_DATA: true });
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
  test("logins", async () => {
    const user: Person = UserOperators.PersonMock;
    user.id = undefined;
    const userFromService: Person = await UserService.login(user);
    expect(userFromService.id).toBeDefined();
    expect(userFromService.email).toEqual(user.email);
  });
  test("register", async () => {
    const user: Person = UserOperators.PersonMock;
    user.id = undefined;
    const userFromService: Person = await UserService.register(user);
    expect(userFromService.id).toBeDefined();
    expect(userFromService.email).toEqual(user.email);
  });
  test('register by spying http', async () => {
    setConfig({ LOCAL_MOCKUP_DATA: false });
    //setting spy on `http.post` and mocking it so that it returns `PersonMock`
    // `http.post` is called by the `UserService.register`
    const getHttpGetSpy = vi.spyOn(http, 'post')
    getHttpGetSpy.mockResolvedValue({ data: UserOperators.PersonMock })

    const result: Person = await UserService.register(UserOperators.PersonMock)

    getHttpGetSpy.mock.calls.length === 1
    expect(getHttpGetSpy).toHaveBeenCalled()
    expect(vi.isMockFunction(getHttpGetSpy)).toBe(true);
    console.log("getHttpGetSpy.mock.results[0].value", getHttpGetSpy.mock.results[0].value)
    expect(getHttpGetSpy.mock.results[0].value).toEqual({ data: UserOperators.PersonMock })

    console.log('getHttpGetSpy.mock.calls', getHttpGetSpy.mock.calls)
    console.log('getHttpGetSpy.mock.results', getHttpGetSpy.mock.results)
    console.log('result', result);

    expect(result).toEqual({ data: UserOperators.PersonMock})
  })
})
