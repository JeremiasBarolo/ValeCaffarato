const { maestroArticulosProvider } = require('../providers');

const listAllMaestroArticulos = async () => {
    return await maestroArticulosProvider.listAllMaestroArticulos();
};

const listOneMaestroArticulos = async (MaestroArticulos_id) => {
    return await maestroArticulosProvider.listOneMaestroArticulos(MaestroArticulos_id);
};

const createMaestroArticulos = async (MaestroArticulosData) => {
    return await maestroArticulosProvider.createMaestroArticulos(MaestroArticulosData);
};


const updateMaestroArticulos = async (MaestroArticulos_id, updateMaestroArticulos) => {
    return await maestroArticulosProvider.updateMaestroArticulos(MaestroArticulos_id, updateMaestroArticulos);
};

const deleteMaestroArticulos = async (MaestroArticulos_id) => {
    return await maestroArticulosProvider.deleteMaestroArticulos(MaestroArticulos_id);
};


module.exports = {
    listAllMaestroArticulos, listOneMaestroArticulos, createMaestroArticulos, updateMaestroArticulos, deleteMaestroArticulos, 
};
