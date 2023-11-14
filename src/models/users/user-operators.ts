import type { Person } from "./users-vos";

export class UserOperators {
  static get PersonMock(): Person {
    return {
      id: '1', //TODO: to fit type
      firstName: "Sinisa",
      lastName: "Rudan",
      email: "sinisa.rudan@gmail.com",
      password: "pass"
    }
  }
  static get PersonInit(): Person {
    return {
      id: undefined,
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  }
}
