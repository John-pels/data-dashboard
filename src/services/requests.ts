import BaseRequest from ".";
import { INewTaskPayload, ITodos } from "../@types";
import { API_ROUTES } from "./routes";

/*=============================================
=         API HTTP Methods and routes          =
=============================================*/

/**
 *
 * Here, we can now extend and bind the APU configuration we had created with the routes
 *
 */

class RequestService extends BaseRequest {
  getAllTodos = async (id = "") => {
    return await this.api.get(`${API_ROUTES.GET_ALL_TODOS}/${id}`);
  };

  addNewTask = async (payload: INewTaskPayload) => {
    return await this.api.post(API_ROUTES.GET_ALL_TODOS, payload);
  };
  deleteTask = async (userId: number) => {
    return await this.api.delete(`${API_ROUTES.DELETE_TASK}/${userId}`);
  };
  editTask = async (payload: Omit<ITodos, "id">, userId: number) => {
    return await this.api.patch(`${API_ROUTES.EDIT_TASK}/${userId}`, payload);
  };
}

const requestService = new RequestService();

export default requestService;
