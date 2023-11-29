export interface InsumoEntity{
    unidad_medida: string;
    PedidosInsumos?: any;
    id?: number;
    name: string
    price: number;
    description: string;
    cantidad?: number; 
}

