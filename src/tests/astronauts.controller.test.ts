import { Request, Response } from 'express';
import { AstronautsController } from '../controllers/astronauts.controller';
import { AstronautsService } from '../services/astronauts.service';
import { AstronautsServiceMock } from './__mocks__/astronauts.service';
import { IAstronaut } from '../models/astronaut.model';

interface IHttpResponse {
    data?: any[] | {},
    message?: string,
    error?: string | {},
}

jest.mock('../services/astronauts.service', () => {
    return {AstronautsService: jest.fn(() => AstronautsServiceMock)}
})

describe('AstronautsController', () => {
    let controller: AstronautsController;
    let service: AstronautsService;
    let responseObject: IHttpResponse = {};
    let responseCode = 0;

    beforeEach(() => {
        service = new AstronautsService();
        controller = new AstronautsController(service);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('get and return all astrauts', async () => {
        const mockAstronauts = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
        const request = {};
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            })
        };
        
        (service.getAll as jest.MockedFunction<any>).mockReturnValue(mockAstronauts);

        await controller.getAll(request as Request, response as Response);

        expect(responseCode).toBe(200);
        expect(responseObject.data).toEqual(mockAstronauts);
        expect(responseObject.message).toEqual('Astronauts finded');
    });

    it('get and return zero astraut', async () => {
        const mockAstronauts: IAstronaut[] = [];
        const request = {};
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            })
        };
        
        (service.getAll as jest.MockedFunction<any>).mockReturnValue(mockAstronauts);

        await controller.getAll(request as Request, response as Response);

        expect(responseCode).toBe(200);
        expect(responseObject.data).toEqual(mockAstronauts);
        expect(responseObject.message).toEqual('Astronauts finded');
    });

    it('get and return one astraut', async () => {
        const mockAstronaut = { id: 1, name: 'John Doe' };
        const request: Partial<Request> = {params: {id: '1'}};
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            })
        };

        (service.getOne as jest.MockedFunction<any>).mockReturnValue(mockAstronaut);

        await controller.getOne(request as Request, response as Response);

        expect(responseCode).toBe(200);
        expect(responseObject.data).toEqual(mockAstronaut);
        expect(responseObject.message).toEqual('Astronaut finded');
    });

    it('get wrong id and return object', async () => {
        const mockAstronaut = {};
        const request: Partial<Request> = {params: {id: '2'}};
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            })
        };

        (service.getOne as jest.MockedFunction<any>).mockReturnValue(mockAstronaut);

        await controller.getOne(request as Request, response as Response);

        expect(responseCode).toBe(200);
        expect(responseObject.data).toEqual(mockAstronaut);
        expect(responseObject.message).toEqual('Astronaut finded');
    });

    it('get with no id and return object', async () => {
        const mockAstronaut = {};
        const request: Partial<Request> = {params: {}};
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            })
        };

        (service.getOne as jest.MockedFunction<any>).mockReturnValue(mockAstronaut);

        await controller.getOne(request as Request, response as Response);

        expect(responseCode).toBe(200);
        expect(responseObject.data).toEqual(mockAstronaut);
        expect(responseObject.message).toEqual('Astronaut finded');
    });

    it('get with no params url and return undefined', async () => {
        const mockAstronaut = {};
        const request: Partial<Request> = {};
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            })
        };

        (service.getOne as jest.MockedFunction<any>).mockReturnValue(mockAstronaut);

        await controller.getOne(request as Request, response as Response);

        expect(responseCode).toBe(500);
        expect(responseObject.data).toEqual(undefined);
        expect(responseObject.error).toEqual("Cannot read properties of undefined (reading 'id')");
        expect(responseObject.message).toEqual(undefined);
    });

    it('create and return astraut', async () => {
        const mockAstronaut = { name: 'John Doe', email: 'jest@test.com' };
        const createdAstronaut = { ...mockAstronaut, id: 1 };
        const request: Partial<Request> = { body: mockAstronaut };
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            }),
        };

        jest.spyOn(service, 'create').mockResolvedValue(createdAstronaut);
        await controller.create(request as Request, response as Response);

        expect(responseCode).toBe(201);
        expect(responseObject.data).toEqual(createdAstronaut);
        expect(responseObject.message).toBe('Astronaut created');
    });

    it('no create astraut with body empty', async () => {
        const request: Partial<Request> = { body: {} };
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            }),
        };

        jest.spyOn(service, 'create').mockResolvedValue({});
        await controller.create(request as Request, response as Response);

        expect(responseCode).toBe(201);
        expect(responseObject.data).toEqual({});
        expect(responseObject.message).toBe('Astronaut created');
    });

    it('no create astraut with no body request', async () => {
        const request: Partial<Request> = {};
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            }),
        };

        jest.spyOn(service, 'create').mockResolvedValue({});
        await controller.create(request as Request, response as Response);

        expect(responseCode).toBe(500);
        expect(responseObject.data).toEqual(undefined);
        expect(responseObject.error).toEqual('An unknown error occurred');
        expect(responseObject.message).toBe(undefined);
    });

    it('create and update astraut', async () => {
        const mockAstronaut = { name: 'John Doe', email: 'jest@test.com' };
        const createdAstronaut = { ...mockAstronaut, id: 1 };
        const mockUpdateAstronaut = { name: 'Doe John' };
        const updatedAstronaut = { id: 1, name: 'Doe John', email: 'jest@test.com' };
        const requestCreate: Partial<Request> = { body: mockAstronaut };
        const requestUpdate: Partial<Request> = { params: { id: '1' }, body: mockUpdateAstronaut };
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            }),
        };

        jest.spyOn(service, 'create').mockResolvedValue(createdAstronaut);
        await controller.create(requestCreate as Request, response as Response);

        expect(responseCode).toBe(201);
        expect(responseObject.data).toEqual(createdAstronaut);
        expect(responseObject.message).toBe('Astronaut created');

        jest.spyOn(service, 'update').mockResolvedValue([1, [updatedAstronaut]]);
        await controller.update(requestUpdate as Request, response as Response);

        const [data] = responseObject.data as IAstronaut[];

        expect(responseCode).toBe(201);
        expect(data).toEqual(updatedAstronaut);
        expect(responseObject.message).toBe('Astronaut updated');
    });

    it('create and update body empty astraut', async () => {
        const mockAstronaut = { name: 'John Doe', email: 'jest@test.com' };
        const createdAstronaut = { ...mockAstronaut, id: 1 };
        const mockUpdateAstronaut = { };
        const updatedAstronaut = createdAstronaut;
        const requestCreate: Partial<Request> = { body: mockAstronaut };
        const requestUpdate: Partial<Request> = { params: { id: '1' }, body: mockUpdateAstronaut };
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            }),
        };

        jest.spyOn(service, 'create').mockResolvedValue(createdAstronaut);
        await controller.create(requestCreate as Request, response as Response);

        expect(responseCode).toBe(201);
        expect(responseObject.data).toEqual(createdAstronaut);
        expect(responseObject.message).toBe('Astronaut created');

        jest.spyOn(service, 'update').mockResolvedValue([1, [updatedAstronaut]]);
        await controller.update(requestUpdate as Request, response as Response);

        const [data] = responseObject.data as IAstronaut[];

        expect(responseCode).toBe(201);
        expect(data).toEqual(updatedAstronaut);
        expect(responseObject.message).toBe('Astronaut updated');
    });

    it('create and not update with no params', async () => {
        const mockAstronaut = { name: 'John Doe', email: 'jest@test.com' };
        const createdAstronaut = { ...mockAstronaut, id: 1 };
        const mockUpdateAstronaut = { };
        const updatedAstronaut = createdAstronaut;
        const requestCreate: Partial<Request> = { body: mockAstronaut };
        const requestUpdate: Partial<Request> = { body: mockUpdateAstronaut };
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            }),
        };

        jest.spyOn(service, 'create').mockResolvedValue(createdAstronaut);
        await controller.create(requestCreate as Request, response as Response);

        expect(responseCode).toBe(201);
        expect(responseObject.data).toEqual(createdAstronaut);
        expect(responseObject.message).toBe('Astronaut created');

        jest.spyOn(service, 'update').mockResolvedValue([1, [updatedAstronaut]]);
        await controller.update(requestUpdate as Request, response as Response);

        expect(responseCode).toBe(500);
        expect(responseObject.data).toEqual(undefined);
        expect(responseObject.error).toEqual("Cannot read properties of undefined (reading 'id')");
        expect(responseObject.message).toBe(undefined);
    });

    it('create and delete astraut', async () => {
        const mockAstronaut = { name: 'John Doe', email: 'jest@test.com' };
        const createdAstronaut = { ...mockAstronaut, id: 1 };
        const requestCreate: Partial<Request> = { body: mockAstronaut };
        const requestDelete: Partial<Request> = { params: { id: '1' } };
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            }),
        };

        jest.spyOn(service, 'create').mockResolvedValue(createdAstronaut);
        await controller.create(requestCreate as Request, response as Response);

        expect(responseCode).toBe(201);
        expect(responseObject.data).toEqual(createdAstronaut);
        expect(responseObject.message).toBe('Astronaut created');

        jest.spyOn(service, 'delete').mockResolvedValue(true);
        await controller.delete(requestDelete as Request, response as Response);

        expect(responseCode).toBe(204);
        expect(responseObject.data).toEqual(createdAstronaut.id);
        expect(responseObject.message).toBe('Astronaut deleted');
    });

    it('delete astraut who not exists', async () => {
        const requestDelete: Partial<Request> = { params: { id: '1' } };
        const response: Partial<Response> = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockImplementation((code) => {
                responseCode = code;
        
                return response;
            }),
        };

        jest.spyOn(service, 'delete').mockResolvedValue(false);
        await controller.delete(requestDelete as Request, response as Response);

        expect(responseCode).toBe(404);
        expect(responseObject.data).toEqual(undefined);
        expect(responseObject.error).toEqual('Astronaut not found');
        expect(responseObject.message).toBe(undefined);
    });
});