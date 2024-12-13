import { URLParams } from "./General";
import { UserModel } from "./User";

export type TaskModelShort = {
    [key: string]: string | undefined;
    id: string,
    summary: string,
    description: string,
    status: Status,
    priority: Priority,
    created_at: string,
    user_id: string
}

export type TaskModel = {
    [key: string]: string | UserModel;
    id: string,
    summary: string,
    description: string,
    status: Status,
    priority: Priority,
    assignee: string,
    dueDate: string
    createdAt: string,
    timeTracking: string,
}

export type TaskParamModel = URLParams & {
    id: string,
    summary: string,
    description: string,
    createdFrom: string,
    createdTo: string,
    all: "true" | "false",
    status: Status,
    priority: Priority,
}

export type CreateTaskModel = {
    [key: string]: string | undefined;
    summary: string,
    description: string,
    status: Status,
    priority: Priority,
    user_id?: string,
    assignee?: string,
    dueDate?:string
}

export enum Priority {
    HIGHEST = "HIGHEST",
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW",
    LOWEST = "LOWEST"
}

export enum Status {
    OPEN = "OPEN",
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = "IN_REVIEW",
    APPROVED = "APPROVED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
    ON_HOLD = "ON_HOLD",
    PENDING_REVIEW = "PENDING_REVIEW",
    DEFERRED = "DEFERRED",
    BLOCKED = "BLOCKED",
    READY_FOR_TESTING = "READY_FOR_TESTING",
    IN_TESTING = "IN_TESTING",
    FAILED_TESTING = "FAILED_TESTING",
    READY_FOR_DEPLOYMENT = "READY_FOR_DEPLOYMENT",
    DEPLOYED = "DEPLOYED",
    ARCHIVED = "ARCHIVED",
    WAITING_FOR_INPUT = "WAITING_FOR_INPUT"
}

export enum PriorityColor {
    HIGHEST = "red",
    HIGH = "orange",
    MEDIUM = "yellow",
    LOW = "light-blue",
    LOWEST = "green"
}

export const StatusColor: { [key in Status]: string } = {
    [Status.OPEN]: "light-gray",
    [Status.TO_DO]: "yellow",
    [Status.IN_PROGRESS]: "green",
    [Status.IN_REVIEW]: "blue",
    [Status.APPROVED]: "green",
    [Status.CANCELLED]: "red",
    [Status.COMPLETED]: "green",
    [Status.ON_HOLD]: "yellow",
    [Status.PENDING_REVIEW]: "yellow",
    [Status.DEFERRED]: "yellow",
    [Status.BLOCKED]: "red",
    [Status.READY_FOR_TESTING]: "blue",
    [Status.IN_TESTING]: "blue",
    [Status.FAILED_TESTING]: "red",
    [Status.READY_FOR_DEPLOYMENT]: "green",
    [Status.DEPLOYED]: "green",
    [Status.ARCHIVED]: "light-gray",
    [Status.WAITING_FOR_INPUT]: "yellow"
};
