var models = require('../models');
const UtilsService = require('../classes/utils');
const utilsService = new UtilsService();

const listAllDocumento= async () => {
  try {
    const Documento = await models.Documentos.findAll(
      {
        include: { all: true },
      },
    );
    console.log('✅ Documento were found');
    return Documento.map(documento => ({
      id: documento.id,
      user:`${documento.Personas[0].name} ${documento.Personas[0].lastname}`,
      fecha: documento.createdAt,
      total: documento.total,
      Pedido: documento.Pedidos[0],
      Documento: documento,
      tipo: documento.tipo,
    }))
  
  } catch (err) {
    console.error('🛑 Error when fetching Documento', err);
    throw err;
  }
};

const listOneDocumento= async (Documento_id) => {
  try {
    const oneDocumento= await models.Documentos.findByPk(Documento_id, {
      include: { all: true },
    });
    if (!oneDocumento) {
      console.error(`🛑 Documentowith id ${Documento_id} not found`);
      return null;
    }
    return oneDocumento;
  } catch (err) {
    console.error('🛑 Error when fetching Documento', err);
    throw err;
  }
};

const createDocumento= async (DocumentoData) => {
  

  try {

    const pedido = await models.Pedidos.findByPk(DocumentoData.pedido, 
      include= { all: true }
    )
    
    const dataDocumento= {
      iva: 1,
      totalIva: 1,
      total: pedido.subtotal,
      condicionIva: DocumentoData.condicionIva,
      tipo: DocumentoData.tipo,
    };
    

    const newDocumento= await models.Documentos.create(dataDocumento);
   
    await models.PedidoDocumentos.create({
      documentoId: newDocumento.id,
        pedidoId: DocumentoData.pedido
      })
    

    await models.PersonaDocumentos.create({
      personaId: DocumentoData.cliente,
      documentoId: newDocumento.id
    })
    
    
    console.log(`✅ Documento"${newDocumento.id}" was created`);
    return newDocumento;
    
    
  } catch (err) {
    console.error('🛑 Error when creating Documento', err);
    throw err;
  }
};

const updateDocumento= async (Documento_id, dataUpdated) => {
  

  try {

    const oldDocumento= await models.Documentos.findByPk(Documento_id, 
        { include: { all: true } 
    });
    
    let newDocumento = await oldDocumento.update(dataUpdated);

    return newDocumento;
  } catch (err) {
    console.error('🛑 Error when updating Documento', err);
    throw err;
  }
  
};


const deleteDocumento = async (Documento_id) => {
  try {
    const deletedDocumento = await models.Documentos.findByPk(Documento_id, 
      { include: { all: true } ,
    });

    if (!deletedDocumento) {
      console.error(`🛑 Documento with id: ${Documento_id} not found`);
      return null;
    }

    
  for (const persona of deletedDocumento.Personas) {

    if(persona){
        await models.PersonaDocumentos.destroy({ where:  
            { 
              personaId: persona.id,
              documentoId: deletedDocumento.id
            } });
    }  
  }

  for(const pedido of deletedDocumento.Pedidos){
    if(pedido){
        await models.PedidoDocumentos.destroy({ where:  
            { 
              pedidoId: pedido.id,
              documentoId: deletedDocumento.id
            } });
    }  
  }

    
    await models.Documentos.destroy({ where: { id: Documento_id } });

    console.log(`✅ Documento with id: ${Documento_id} was deleted successfully`);
    return deletedDocumento;
  } catch (err) {
    console.error('🛑 Error when deleting Documento', err);
    throw err;
  }
};


module.exports = {
  listAllDocumento, listOneDocumento, createDocumento, updateDocumento, deleteDocumento,
};
