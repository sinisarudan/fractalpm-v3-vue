/**
 * @class
 */
export default class Person {
  /**
   * The unique identifier for the person.
   * @type {string | undefined}
   */
  id;

  /**
   * @type {string}
   */
  firstName;

  /**
   * @type {string}
   */
  lastName;

  /**
   * The email address of the person.
   * @type {string}
   */
  email;

  /**
   * The password of the person.
   * @type {string}
   */
  password;

  /**
   * Creates a new instance of the Person class.
   * @param {string | undefined} id - The unique identifier for the person.
   * @param {string} firstName - The first name of the person.
   * @param {string} lastName - The last name of the person.
   * @param {string} email - The email address of the person.
   * @param {string} password - The password of the person.
   */
  constructor(firstName, lastName, email, password, id = undefined) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  /**
 * a static method
 * @returns {Person} A mock instance of the Person class.
 */
  static get PersonMock() {
    return {
      id: '1', //TODO: to fit type
      firstName: "Sinisa",
      lastName: "Rudan",
      email: "sinisa.rudan@gmail.com",
      password: "pass"
    }
  }
  
/**
 * a static method
 * @returns {Person} An empty instance of the Person class.
 */
  static get PersonInit() {
    return {
      id: undefined,
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  }
}