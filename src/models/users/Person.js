import { VersionedModel } from '../VersionedModel';

/**
 * @class
 */
export default class Person extends VersionedModel {
  /**
   * @type {string}
   */
  first_name;

  /**
   * @type {string}
   */
  last_name;

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
   * @param {(string | undefined)} id - The unique identifier for the person.
   * @param {string} first_name - The first name of the person.
   * @param {string} last_name - The last name of the person.
   * @param {string} email - The email address of the person.
   * @param {string} password - The password of the person.
   */
  constructor (first_name, last_name, email, password, entity_id = undefined) {
    super(entity_id);
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }

  /** used for security reasons, logging etc
 * @returns {Person} user cleaned of pass.
 */
  get userWoPass () {
    return { ...this, password: '--HIDDEN--' };
  }

  /**
 * a static method
 * @returns {Person} A mock instance of the Person class.
 */
  static get PersonMock () {
    return new Person('Sinisa', 'Rudan', 'sinisa.rudan@gmail.com', 'pass', '1');
  }

  /**
 * a static method
 * @returns {Person} An empty instance of the Person class.
 */
  static get PersonInit () {
    return new Person('', '', '');
  }
}
