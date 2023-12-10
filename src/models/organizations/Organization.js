import { VersionedModel } from '../VersionedModel';
/**
 * An Organization.
 * @extends VersionedModel
 * @class
 */
export class Organization extends VersionedModel {
  /**
     * The name of the organization.
     * @type {(string | undefined)}
     */
  name;

  /**
     * The code associated with the organization.
     * @type {(string | undefined)}
     */
  code;

  /**
     * The description of the organization.
     * @type {(string | undefined)}
     */
  description;

  /**
     * @param {string} name - The name of the organization.
     * @param {string} code - The code associated with the organization.
     * @param {(string | undefined)} description - The description of the organization.
     */
  constructor (name, code, description) {
    super();

    this.name = name;
    this.code = code;
    this.description = description;
  }

  /**
 * a static method
 * @returns {Organization} A mock instance of the Organization class.
 */
  static OrganizationMock (name, code, description) {
    return new Organization(name || 'MockOrganization', code || 'MOR', description || 'MockOrganization description');
  }

  /**
 * a static method
 * @returns {Organization} An empty instance of the Organization class.
 */
  static get OrganizationInit () {
    return new Organization('', '', '');
  }
}
