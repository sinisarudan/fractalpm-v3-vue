export const ServerResponseCode = {
  ERROR_REQUEST: 'ERROR_REQUEST'
};

/**
 * Class representing a response from the server
 * @class
 */
export class ServerResponse {
  /**
    * Response code (relates to `ServerResponseCode` "ENUM", but not enforced to only its values)
    * @type {string}
    */
  code;

  /**
    * Success or Failure
    * @type {boolean}
    */
  status;

  /**
    * response message
    * @type {string}
    */
  message;

  /**
    * real data returned from response
    * @type {any}
    */
  data;

  /**
   * Creates a new instance of the ServerResponse class.
   * @param {string} code - The response code.
   * @param {boolean} status - The success or failure status.
   * @param {string} message - The response message.
   * @param {any} data - The real data returned from the response.
   */
  constructor (code, status = false, message = '', data = undefined) {
    this.code = code;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
