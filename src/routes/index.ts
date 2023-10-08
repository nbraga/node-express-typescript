import { Request, Response, Router } from "express";
import { userRoutes } from "./user";
import { loginRoutes } from "./login";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    return res.status(200).send({ message: "Rota de API online" });
});

router.use("/user", userRoutes);
router.use("/login", loginRoutes);

export { router };
