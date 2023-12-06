
// Requires
const express = require("express")
const { 
    personasRouter,
    insumosRouter,
    pedidosRouter,
    cantidadesRouter,
    productosRouter,
    documentosRouter,
    generarPdfRouter,
    maestroArticulosRouter
 } = require('./routes')
const { initializeDB } = require('./db/initializeDB');
const cors = require("cors");
const {checkAdmin} = require('./db/createAdminEntity');
const { generarPdf } = require("./services/documentos");


// App Creation
const app = express();
const PORT = process.env.PORT || 3001;

// Aplication Middlewares
app.use(express.json()) 
app.use(cors());

// Routes
app.use("/personas", personasRouter)
app.use("/maestro-articulos", maestroArticulosRouter)
app.use('/insumos', insumosRouter)
app.use('/pedidos', pedidosRouter)
app.use('/cantidades', cantidadesRouter)
app.use('/productos', productosRouter)
app.use('/documento', documentosRouter)
app.use('/generar-factura', generarPdfRouter)






app.listen(PORT, 
    async () => {
        await initializeDB();
        // await checkAdmin();
        console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`);
})


