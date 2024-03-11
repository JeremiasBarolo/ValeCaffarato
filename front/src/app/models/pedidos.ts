

export interface Pedidos{
    message(message: any): unknown;
    id?: number;
    name: string;
    subtotal: number;
    state: string;
    description: string;
    category: string;
    createdAt?: Date
    insumos?: any[];
    productos?: any[];
    Persona: {
        id: number;
        name: string;
        email: string;
        lastname: string;
    }
}

