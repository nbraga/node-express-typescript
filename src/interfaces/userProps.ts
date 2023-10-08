import { ObjectId } from "mongodb";

export interface UserProps {
    _id: ObjectId;
    fullname: string;
    email: string;
    status: boolean;
    password: string;
    company: ObjectId;
    profile: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
}

export interface UserRegisterProps {
    name: string;
    email: string;
    password: string;
}
