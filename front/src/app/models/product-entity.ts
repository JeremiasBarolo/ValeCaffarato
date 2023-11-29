export interface ProductEntity{
    unidad_medida: any;
    PedidosProductos?: any;
    PedidosInsumos?: any;
    id?: number;
    name: string;
    description: string;
    measurement_height: number;
    measurement_length: number;
    measurement_depth: number;
    profit: number;
    price: number;
    quantity?: number;
}

