import { AstronautsController } from "../controllers/astronauts.controller";
import SimpleContainer from "../services";
import { AstronautsService } from "../services/astronauts.service";
import { routerFactory } from "../utils/routerFactory";

export const astronauteRouter = routerFactory(
    new AstronautsController(SimpleContainer.resolve(AstronautsService.name)),
);
