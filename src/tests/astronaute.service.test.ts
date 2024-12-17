import { AstronautsService } from '../services/astronauts.service';
import { AstronautModel } from "../models";


jest.mock('../models/astronaut.model');

describe('AstronautsService', () => {
  let service: AstronautsService;

  beforeEach(() => {
    service = new AstronautsService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('get all astronauts', async () => {
    // Simuler un retour pour findAll
    const mockAstronauts = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
    (AstronautModel.findAll as jest.Mock).mockResolvedValue(mockAstronauts);

    const result = await service.getAll();
    expect(result).toEqual(mockAstronauts);
    expect(AstronautModel.findAll).toHaveBeenCalledTimes(1);
  });

  it('devrait récupérer un astronaute par son ID', async () => {
    const mockAstronaut = { id: 1, name: 'John Doe' };
    (AstronautModel.findByPk as jest.Mock).mockResolvedValue(mockAstronaut);

    const result = await service.getOne(1);
    expect(result).toEqual(mockAstronaut);
    expect(AstronautModel.findByPk).toHaveBeenCalledWith(1);
  });

  it('devrait créer un astronaute', async () => {
    const astroData = { name: 'John Doe', email: 'john.doe@example.com' };
    const createdAstro = { id: 1, ...astroData };
    (AstronautModel.create as jest.Mock).mockResolvedValue(createdAstro);

    const result = await service.create(astroData);
    expect(result).toEqual(createdAstro);
    expect(AstronautModel.create).toHaveBeenCalledWith(expect.objectContaining(astroData));
  });

  it('devrait mettre à jour un astronaute', async () => {
    const existingAstro = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    const updatedAstro = { id: 1, name: 'Updated Name', email: 'john.doe@example.com' };
    (AstronautModel.findByPk as jest.Mock).mockResolvedValue(existingAstro);
    (AstronautModel.update as jest.Mock).mockResolvedValue([1, [updatedAstro]]);

    const result = await service.update(1, updatedAstro);
    expect(result).toEqual([1, [updatedAstro]]);
    expect(AstronautModel.update).toHaveBeenCalledWith(expect.objectContaining(updatedAstro), {
      where: { id: 1 },
      returning: true,
    });
  });

  it('devrait supprimer un astronaute', async () => {
    (AstronautModel.destroy as jest.Mock).mockResolvedValue(1);

    const result = await service.delete(1);
    expect(result).toEqual(true);
    expect(AstronautModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
