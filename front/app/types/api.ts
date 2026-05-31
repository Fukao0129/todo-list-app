import type { components } from "./schema";
import type { FetchError } from "ofetch";
import type { ValidationErrors } from "./validation-errors";

// APIバリデーションエラー型
export type ApiValidationError = FetchError<{ errorMessage: ValidationErrors }>;

// Scrambleが生成する再利用可能な型 // https://scramble.dedoc.co/packages/laravel-data
type Schemas = components["schemas"];

export type Todo = Schemas["TodoResource"];
export type CreateTodoRequest = Schemas["TodoRequest"];
export type UpdateTodoRequest = Schemas["TodoRequest"];

export type Status = Schemas["StatusResource"];
export type CreateStatusRequest = Schemas["StatusRequest"];
export type UpdateStatusRequest = Schemas["StatusRequest"];

export type User = Schemas["UserResource"];
export type UpdateUserRequest = Schemas["UserRequest"];
