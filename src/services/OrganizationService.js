import http from '@/http-common';
import { ServerResponse, ServerResponseCode } from './ServerResponse';
import { Organization } from '@/models/organizations/Organization';

export const ServerResponseOrganizationServiceCode = {
  ...ServerResponseCode
  // EMAIL_EXISTS: 'EMAIL_EXISTS',
  // SIGNUP_ERROR: 'SIGNUP_ERROR'
};

/**
 * Misc Mockups for `OrganizationService` testing and demoing
 * @class
 */
export class OrganizationServiceMockups {
  /**
   * a max id:
   * @type {number}
   */
  static MAX_ID = 1;

  static DESC = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi proin sed libero enim. Nascetur ridiculus mus mauris vitae ultricies. Nec nam aliquam sem et tortor consequat. Ultrices vitae auctor eu augue ut lectus arcu bibendum. Sit amet cursus sit amet dictum sit amet. Purus in mollis nunc sed id semper risus in.';

  /**
   * a list of organizations:
   * @type {Organization[]}
   */
  static organizations = [
    Organization.OrganizationMock('Organization_' + OrganizationServiceMockups.MAX_ID++, 'MOR' + OrganizationServiceMockups.MAX_ID, OrganizationServiceMockups.DESC),
    Organization.OrganizationMock('Organization_' + OrganizationServiceMockups.MAX_ID++, 'MOR' + OrganizationServiceMockups.MAX_ID, OrganizationServiceMockups.DESC),
    Organization.OrganizationMock('Organization_' + OrganizationServiceMockups.MAX_ID++, 'MOR' + OrganizationServiceMockups.MAX_ID, OrganizationServiceMockups.DESC),
    Organization.OrganizationMock('Organization_' + OrganizationServiceMockups.MAX_ID++, 'MOR' + OrganizationServiceMockups.MAX_ID, OrganizationServiceMockups.DESC),
    Organization.OrganizationMock('Organization_' + OrganizationServiceMockups.MAX_ID++, 'MOR' + OrganizationServiceMockups.MAX_ID, OrganizationServiceMockups.DESC),
    Organization.OrganizationMock('Organization' + OrganizationServiceMockups.MAX_ID++, 'MOR' + OrganizationServiceMockups.MAX_ID, OrganizationServiceMockups.DESC)
  ];

  /**
   *  @type {OrganizationServiceMockups}
   * The singleton instance of OrganizationServiceMockups.
   */
  static instance;

  /**
   * Static factory method to get the singleton instance of OrganizationServiceMockups.
   * @returns {OrganizationServiceMockups}
   */
  static getInstance () {
    if (!OrganizationServiceMockups.instance) {
      OrganizationServiceMockups.instance = new OrganizationServiceMockups();
    }
    return OrganizationServiceMockups.instance;
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
 * providing (server-oriented) services for Organizations
 * @class
 */
export class OrganizationService {
  /**
   * @type {Config}
   */
  static config = ConfigDefault;

  /**
   * checks the validity of a code for a given phone number or email address.
   *
   * @param {string} userId - user.entity_id
   * @returns {(Promise<ServerResponse>)} A `Promise` that resolves to the ServerResponse, containing `Organizations` for the user.
   */
  static async getOrganizationsForUser (userId) {
    console.log(`[getOrganizationsForUser] userId=${userId}`);
    if (OrganizationService.config.LOCAL_MOCKUP_DATA) {
      return new Promise(resolve => setTimeout(() => resolve({ status: true, data: OrganizationServiceMockups.organizations }), 1000));
    } else {
      /**
       * @type {ServerResponse}
       */
      let response;
      try {
        response = await http.get(`/get_organizations_for_user?user_id=${userId}`);
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
