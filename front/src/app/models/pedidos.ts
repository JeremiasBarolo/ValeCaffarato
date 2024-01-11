

export interface Pedidos{
    id?: number;
    name: string;
    subtotal: number;
    state: string;
    description: string;
    category: string;
    createdAt?: Date
    insumos?: any[];
    productos?: any[];
}

