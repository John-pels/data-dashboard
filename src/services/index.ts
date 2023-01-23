import axios, { AxiosInstance } from "axios";

/*=============================================
=           Axios or API configuration           =
=============================================*/

/**
 *
 * For scalibility and maintainabiity, all the axios or API configuration can be done here and reusable across the
 *
 */

class BaseRequest {
  protected api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
    });
  }
}

export default BaseRequest;
