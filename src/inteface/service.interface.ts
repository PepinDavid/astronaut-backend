/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IServiceBaseInstance {
    getAll(): Promise<any[]>;
    getOne(id: number): Promise<any | null>;
    create(data: Partial<any>): Promise<any>;
    update(id: number, data: any): Promise<[number, any[]]>
    delete(id: number): Promise<boolean>;
}