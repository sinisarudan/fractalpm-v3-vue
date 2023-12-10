import Project from '@/models/projects/Project';

/**
 * Represents the Pinia state of projects.
 * @class
 */
export class ProjectsState {
  /**
     * Projects
     * @type {Project[]}
     */
  projects = [];

  /**
   * @param {Project[]} projects
   */
  constructor (projects = []) {
    this.projects = projects;
  }
}
