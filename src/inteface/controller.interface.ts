import { Request, Response } from "express";
import { IServiceBaseInstance } from "./service.interface";

export interface IControllerBaseInstance {
    service?: IServiceBaseInstance;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    getAll(request: Request, Response: Response): Promise<Response>;
    getOne(request: Request, Response: Response): Promise<Response>;
    create(request: Request, Response: Response): Promise<Response>;
    update(request: Request, Response: Response): Promise<Response>;
    delete(request: Request, Response: Response): Promise<Response>;
}