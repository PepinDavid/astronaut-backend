import { Request, Response } from "express";
import { IControllerBaseInstance } from "../inteface/controller.interface";
import { IServiceBaseInstance } from "../inteface/service.interface";
import { ErrorHandler } from "../utils/errorHandle";

export class AstronautsController implements IControllerBaseInstance {
    service: IServiceBaseInstance;

    constructor(service: IServiceBaseInstance) {
        this.service = service;

        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(request: Request, response: Response): Promise<Response> {
        try {
            const astronauts = await this.service.getAll();

            return response.status(200).json({data: astronauts, message: 'Astronauts finded'});
        } catch(error) {
            return ErrorHandler.handleError(response, error);
        }
    }

    async getOne(request: Request, response: Response): Promise<Response> {
        try {
            const id = Number(request.params.id);
            const astronaut = await this.service.getOne(id);

            if (!astronaut) {
                return ErrorHandler.handleNotFound(response, 'Astronaut not found');
            }

            return response.status(200).json({data: astronaut, message: 'Astronaut finded'});
        } catch(error) {
            return ErrorHandler.handleError(response, error);
        }
    }

    async create(request: Request, response: Response): Promise<Response> {
        try {
            const body = request?.body;

            if (!body) {
                return ErrorHandler.handleError(response, 'Not create astronaut with empty body');
            }

            const astronaut = await this.service.create(body);

            return response.status(201).json({data: astronaut, message: 'Astronaut created'});
        } catch(error) {
            return ErrorHandler.handleError(response, error);
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        try {
            const id = Number(request.params.id);
            const body = request.body;

            const [, astronaut] = await this.service.update(id, body);

            return response.status(201).json({data: astronaut, message: 'Astronaut updated'});
        } catch(error) {
            return ErrorHandler.handleError(response, error);
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        try {
            const id = Number(request.params.id);
            const success = await this.service.delete(id);

            if (!success) {
                return ErrorHandler.handleNotFound(response, 'Astronaut not found');
            }

            return response.status(204).json({data: id, message: 'Astronaut deleted'});
        } catch(error) {
            return ErrorHandler.handleError(response, error);
        }
    }
}