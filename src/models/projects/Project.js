import { VersionedModel } from '../VersionedModel';
import { Phase } from './Phase';
import { Attachment } from '../attachments/Attachment';
import { Organization } from '../organizations/Organization';

/**
 * @class
 */
export default class Project extends VersionedModel {
  /**
   * @type {(string | undefined)}
   */
  name;

  /**
   * @type {(string | undefined)}
   */
  code;

  /**
   * The organization project belongs to.
   * @type {Organization}
   */
  organization;

  /**
   * The description of the project.
   * @type {(string | undefined)}
   */
  description;

  /**
   * The phases of the project.
   * @type {Phase[]}
   */
  phases = [];

  /**
   * The attachments to the project.
   * @type {Attachment[]}
   */
  attachments = [];

  /**
   * @param {string} name
   * @param {string} code
   * @param {Organization} organization
   * @param {string} description
   * @param {Phase[]} phases
   * @param {Attachment[]} attachments
   */
  constructor (name, code, description = '', organization, phases = [], attachments = []) {
    super();

    this.name = name;
    this.code = code;
    this.organization = organization;
    this.description = description;
    this.phases = phases;
    this.attachments = attachments;
  }

  /**
 * a static method
 * @returns {Project} A mock instance of the Project class.
 */
  static ProjectMock (name, code, description) {
    return new Project(name || 'MockProject', code || 'MPR', description || 'MockProject description', undefined);
  }

  /**
 * a static method
 * @returns {Project} An empty instance of the Project class.
 */
  static get ProjectInit () {
    return new Project('', '', '', undefined, [], []);
  }
}
