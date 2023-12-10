import { defineStore } from 'pinia';
import { OrganizationService, ServerResponseOrganizationServiceCode } from '@/services/OrganizationService';
import { ServerResponse } from '@/services/ServerResponse';
import { OrganizationsState } from './OrganizationsState';
import { Organization } from '@/models/organizations/Organization';

export const useOrganizationsStore = defineStore('Organizations', {
  /**
   * Returns a new instance of the OrganizationsState class with default values.
   * @function
   * @name state
   * @returns {OrganizationsState} A new instance of OrganizationsState.
   * @description Returns a new `OrganizationsState` with default values.
   */
  state: () => {
    return { organizations: undefined };
  },

  actions: {
    /**
   * checks the validity of a code for a given phone number or email address.
   *
   * @param {string} uid - organization uid
   * @param {string} token - The token to be validated.
   * @param {string} [password = undefined] - optional - if provided confirmation will also set password.
   * @returns {Promise<Organization | undefined>} A promise that resolves to `Organization` whose token is checked, otherwise to `undefined`.
   */
    async getOrganizationsForUser (userId) {
      console.log('[organizations/Store::getOrganizationsForUser]', userId);
      /**
       * @type {ServerResponse}
       */
      const response = await OrganizationService.getOrganizationsForUser(userId);
      if (response.status) {
        this.organizations = response.data;
      } else {
        this.organizations = [];
        return ServerResponseOrganizationServiceCode.ERROR_REQUEST;
      }
      return this.organizations;
    }
  }
});
