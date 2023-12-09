import http from '@/http-common';
import { ServerResponse, ServerResponseCode } from './ServerResponse';
import Project from '@/models/projects/Project';

export const ServerResponseProjectServiceCode = {
  ...ServerResponseCode
  // EMAIL_EXISTS: 'EMAIL_EXISTS',
  // SIGNUP_ERROR: 'SIGNUP_ERROR'
};

/**
 * Misc Mockups for `ProjectService` testing and demoing
 * @class
 */
export class ProjectServiceMockups {
  /**
   * a max id:
   * @type {number}
   */
  static MAX_ID = 1;

  /**
   * a list of projects:
   * @type {Project[]}
   */
  static projects = [
    Project.ProjectMock('Project_' + ProjectServiceMockups.MAX_ID++),
    Project.ProjectMock('Project_' + ProjectServiceMockups.MAX_ID++),
    Project.ProjectMock('Project_' + ProjectServiceMockups.MAX_ID++),
    Project.ProjectMock('Project_' + ProjectServiceMockups.MAX_ID++),
    Project.ProjectMock('Project_' + ProjectServiceMockups.MAX_ID++),
    Project.ProjectMock('Project' + ProjectServiceMockups.MAX_ID++)
  ];

  /**
   *  @type {ProjectServiceMockups}
   * The singleton instance of ProjectServiceMockups.
   */
  static instance;

  /**
   * Static factory method to get the singleton instance of ProjectServiceMockups.
   * @returns {ProjectServiceMockups}
   */
  static getInstance () {
    if (!ProjectServiceMockups.instance) {
      ProjectServiceMockups.instance = new ProjectServiceMockups();
    }
    return ProjectServiceMockups.instance;
  }
}

/**
 * Configuration options.
 * @class
 */
export class Config {
  /**
   * if `true`: mocking up; if `false`: using axis service -> backend:
   * @type {boolean}
   */
  LOCAL_MOCKUP_DATA;

  constructor (configObj = ConfigDefault) {
    /**
     * if `true`: mocking up; if `false`: using axis service -> backend:
     * @type {boolean}
     */
    this.LOCAL_MOCKUP_DATA = configObj.LOCAL_MOCKUP_DATA;
  }
}

/**
 * @type {Config}
 */
export const ConfigDefault = { LOCAL_MOCKUP_DATA: true };

/**
 * providing (server-oriented) services for Projects
 * @class
 */
export class ProjectService {
  /**
   * @type {Config}
   */
  static config = ConfigDefault;

  /**
   * checks the validity of a code for a given phone number or email address.
   *
   * @param {string} userId - user.entity_id
   * @returns {(Promise<ServerResponse>)} A `Promise` that resolves to the ServerResponse, containing `Projects` for the user.
   */
  static async getProjectsForUser (userId) {
    console.log(`[getProjectsForUser] userId=${userId}`);
    if (ProjectService.config.LOCAL_MOCKUP_DATA) {
      return new Promise(resolve => setTimeout(() => resolve({ status: true, data: ProjectServiceMockups.projects }), 1000));
    } else {
      /**
       * @type {ServerResponse}
       */
      let response;
      try {
        response = await http.get(`/get_projects_for_user?userId=${userId}`);
        console.log(`[response=${response}`);
        return response.data;
      } catch (error) {
        // Handle error, including 400 Bad Request
        if (error.response) {
          // The request was made, and the server responded with a status code
          console.warn('Response status:', error.response.status);
          console.warn('Response data:', error.response.data);

          // if (error.response.data.code === '...') {
          //   console.warn('...'));
          // }
          return error.response.data;
        } else if (error.request) {
          // The request was made, but no response was received
          console.log('No response received');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error during request setup:', error.message);
        }
        return new ServerResponse(ServerResponseCode.ERROR_REQUEST, false);
      }
    }
  }
}
