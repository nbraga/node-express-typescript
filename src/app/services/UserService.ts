import { UserProps, UserRegisterProps } from "@interfaces/userProps";
import { hash } from "bcryptjs";
import User from "../models/user";
import { BadRequestError } from "src/utils/api-errors";

class UserService {
    static async index() {
        return {
            users: [],
            status: {
                code: 200,
                msg: "",
            },
        };
    }

    static async refreshData(userId: string) {
        const user: UserProps = await User.findOne({ _id: userId });

        if (!user) {
            throw new BadRequestError("Usuário não existe!");
        }

        return {
            user,
            status: {
                code: 200,
                msg: "",
            },
        };
    }

    static async create(objectData: UserRegisterProps) {
        const hashPassword = await hash(objectData.password, 8);

        return {
            status: {
                code: 201,
                msg: "",
            },
        };
    }
}

export default UserService;
