export interface Insumo{
    unidad_medida: string;
    id?: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    createdAt?: Date
    quantity_reserved?: number
}

