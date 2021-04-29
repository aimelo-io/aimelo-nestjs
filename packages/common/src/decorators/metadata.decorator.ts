/** @format */

export function ExtendMetadata<K = string, V = any>(
    metadataKey: K,
    ...metadataValues: V[]
): ClassDecorator | MethodDecorator | PropertyDecorator {
    return <TFunction extends Function, Y>(
        target: TFunction | object,
        propertyKey?: string | symbol,
        descriptor?: TypedPropertyDescriptor<Y>,
    ) => {
        const metadataTarget = descriptor ? descriptor.value : target;
        const metadataData = Reflect.getMetadata(metadataKey, metadataTarget) || [];
        const value = [...metadataData, ...metadataValues];
        Reflect.defineMetadata(metadataKey, value, metadataTarget);
        return descriptor || target;
    };
}
