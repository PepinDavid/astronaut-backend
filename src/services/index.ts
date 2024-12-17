import { IServiceBaseInstance } from "../inteface/service.interface";
import { SimpleContainer } from "../utils/simpleContainer";
import { AstronautsService } from "./astronauts.service";

SimpleContainer.register<IServiceBaseInstance>(AstronautsService.name, new AstronautsService());

export default SimpleContainer;