import { IServiceBaseInstance } from "../inteface/service.interface";
import { AstronautModel } from "../models";
import { IAstronaut } from "../models/astronaut.model";

export class AstronautsService implements IServiceBaseInstance {
    async getAll(): Promise<AstronautModel[]> {
        try {
            return await AstronautModel.findAll();
        } catch(error) {
            console.error(`${AstronautsService.name}: Error fetching Astronauts:`, error);
            throw new Error("Could not fetch Astronauts");
        }
    }

    async getOne(id: number): Promise<AstronautModel | null> {
        try {
            const astronaut = await AstronautModel.findByPk(id);

            if (!astronaut) {
                throw new Error(`Astronaut with id ${id} not found`);
            }

            return astronaut;
        } catch(error) {
            console.error(`${AstronautsService.name}: Error fetching Astronaut:`, error);
            throw new Error("Could not fetch Astronaut");
        }
    }

    async create(astro: Partial<IAstronaut>): Promise<IAstronaut> {
        const astronaut = this._sanitized(astro);

        try {
            return await AstronautModel.create(astronaut);
        } catch(error) {
            console.error(`${AstronautsService.name}: Error creating Astronaut:`, error);
            throw new Error("Could not create Astronaut");
        }
    }

    async update(id: number, astro: IAstronaut): Promise<[number, IAstronaut[]]> {
        try {
            const oldAstro = await AstronautModel.findByPk(id);

            if (!oldAstro) {
                throw new Error(`old Astronaut with id ${id} not found for update`);
            }

            const newAstronaut = this._sanitized(astro, oldAstro);

            return await AstronautModel.update(
                newAstronaut,
                {
                    where: { id },
                    returning: true,
                },
             );
        } catch(error) {
            console.error(`${AstronautsService.name}: Error updating Astronaut:`, error);
            throw new Error("Could not update Astronaut");
        } 
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deletedCount = await AstronautModel.destroy({
                where: { id },
            });

            if (deletedCount === 0) {
                throw new Error(`Astronaut with id ${id} not found for delete`);
            }

            return true;
        } catch(error) {
            console.error(`${AstronautsService.name}: Error deleting Astronaut:`, error);
            throw new Error("Could not delete Astronaut");
        }
    }

    private _sanitized(body: IAstronaut, astronaut?: IAstronaut): Partial<IAstronaut> {
        return {
            id: body?.id || astronaut?.id,
            name: body?.name || astronaut?.name,
            email: body?.email || astronaut?.email,
            createdAt: body?.createdAt || astronaut?.createdAt || new Date(),
            updateAt: new Date(),
        };
    }
}