import { Router } from "express";
import { astronauteRouter } from "./astronaute.route";

const appRouter = Router();

appRouter.use('/astronauts', astronauteRouter);

export {
    appRouter,
}
