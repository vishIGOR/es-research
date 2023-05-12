export class Entity{
    static fromObject(input) {
        const newModel = new this();
        Object.assign(newModel, input);
        return newModel;
    }
}