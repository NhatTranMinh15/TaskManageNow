export interface UserModel {
    [key: string]: string | boolean; // Add an index signature to support dynamic property access
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    createdTimestamp: string,
}

export interface UserParamModel {
    email: string | undefined,
    username: string | undefined,
    first_name: string | undefined,
    last_name: string | undefined,
    page: number,
    size: number
}