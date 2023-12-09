import { defineStore } from 'pinia';
import { ProjectService, ServerResponseProjectServiceCode } from '@/services/ProjectService';
import { ServerResponse } from '@/services/ServerResponse';
import { ProjectsState } from './ProjectsState';
import Project from '@/models/projects/Project';

export const useProjectsStore = defineStore('Projects', {
  /**
   * Returns a new instance of the ProjectsState class with default values.
   * @function
   * @name state
   * @returns {ProjectsState} A new instance of ProjectsState.
   * @description Returns a new `ProjectsState` with default values.
   */
  state: () => {
    return { projects: undefined };
  },

  actions: {
    /**
   * checks the validity of a code for a given phone number or email address.
   *
   * @param {string} uid - project uid
   * @param {string} token - The token to be validated.
   * @param {string} [password = undefined] - optional - if provided confirmation will also set password.
   * @returns {Promise<Project | undefined>} A promise that resolves to `Project` whose token is checked, otherwise to `undefined`.
   */
    async getProjectsForUser (userId) {
      console.log('[projects/Store::getProjectsForUser]', userId);
      /**
       * @type {ServerResponse}
       */
      const response = await ProjectService.getProjectsForUser(userId);
      if (response.status) {
        this.projects = response.data;
      } else {
        this.projects = undefined;
      }
      return this.projects;
    }
  }
});
