import axios from "axios";

const settings = {
  withCredentials: true,
};

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings,
})


export const todoListAPI = {
  getTodoList() {
    return instance.get<TodoListResponseType[]>("todo-lists")
  },

  createTodoList(title: string) {
    return instance.post<ResponseType<{ item: TodoListResponseType }>>("todo-lists", { title })
  },

  deleteTodoList(todoId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoId}`)
  },

  updateTodoList(todoId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todoId}`, { title })
  },

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },

  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskResponseType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{item: TaskResponseType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, { ...model })
  },
};



type ResponseType<T = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: T;
};

export type TodoListResponseType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};


type GetTasksResponseType = {
  error: string | null
  items: TaskResponseType[];
  totalCount: number;
}

export enum TakStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}


export type TaskResponseType = {
  description: string;
  title: string;
  status: TakStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}