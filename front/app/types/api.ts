import type { paths } from "./schema";

export type Todo =
  paths["/todos/{todo_id}"]["get"]["responses"]["200"]["content"]["application/json"];
export type CreateTodoRequest =
  paths["/todos"]["post"]["requestBody"]["content"]["application/json"];
export type UpdateTodoRequest =
  paths["/todos/{todo_id}"]["put"]["requestBody"]["content"]["application/json"];

export type Status =
  paths["/statuses"]["get"]["responses"]["200"]["content"]["application/json"][0];
export type CreateStatusRequest =
  paths["/statuses"]["post"]["requestBody"]["content"]["application/json"];
export type UpdateStatusRequest =
  paths["/statuses/{status_id}"]["put"]["requestBody"]["content"]["application/json"];

export type User =
  paths["/me"]["get"]["responses"]["200"]["content"]["application/json"];
export type UpdateUserRequest =
  paths["/users"]["put"]["requestBody"]["content"]["application/json"];
