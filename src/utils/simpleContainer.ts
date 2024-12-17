export class SimpleContainer {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static services: Map<string, any> = new Map();

    static register<T>(key: string, instance: T): void {
        this.services.set(key, instance);
    }

    static resolve<T>(key: string): T {
        const service = this.services.get(key);

        if (!service) throw new Error(`Service ${key} not found`);

        return service;
    }
}