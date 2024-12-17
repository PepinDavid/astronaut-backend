import { RequestHandler, Router } from "express";
import { IControllerBaseInstance } from "../inteface/controller.interface";

export function routerFactory(controller: IControllerBaseInstance, middlewares?: RequestHandler[]): Router {
    const router = Router();
    const routeMapping:  {[key: string]: 'get' | 'post' | 'put' | 'delete'} = {
        "getAll": 'get',
        "getOne": 'get',
        "create": 'post',
        "update": 'put',
        "delete": 'delete',
    };
    const methodMapping: {[key: string]: string} = {
        "getAll": "/",
        "getOne": "/:id",
        "create": "/",
        "update": "/:id",
        "delete": "/:id",
    };

    if (middlewares?.length) router.use(middlewares);

    Object.keys(controller).forEach((methodName) => {
        if (typeof controller[methodName] === 'function') {
            const routeType = routeMapping[methodName];
            
            router[routeType](`${methodMapping[methodName]}`, controller[methodName].bind(controller));
        }
    });

    return router;
}