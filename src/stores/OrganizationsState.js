import { Organization } from '@/models/organizations/Organization';

/**
 * Represents the Pinia state of organizations.
 * @class
 */
export class OrganizationsState {
  /**
     * Organizations
     * @type {Organization[]}
     */
  organizations = [];

  /**
   * @param {Organization[]} organizations
   */
  constructor (organizations = []) {
    this.organizations = organizations;
  }
}
