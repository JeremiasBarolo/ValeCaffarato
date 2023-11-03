import { InsumoEntity } from "./insumo-entity";

export interface PedidoCompra{
    id?: number;
    name: string;
    description: string;
    subtotal: number;
    InsumosEntities?: InsumoEntity[];
    
}

