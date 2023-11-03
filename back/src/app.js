
// Requires
const express = require("express")
const { empleadosRouter, clientesRouter, proveedoresRouter,productentityRouter, insumosentityRouter, insumosRouter,compraPresupestoRouter,compraFinalizacionRouter ,compraPreparacionRouter } = require('./routes')
const { initializeDB } = require('./db/initializeDB');
const cors = require("cors");
const {checkAdmin} = require('./db/createAdminEntity');


// App Creation
const app = express();
const PORT = process.env.PORT || 3001;

// Aplication Middlewares
app.use(express.json()) 
app.use(cors());

// Routes
app.use("/empleados", empleadosRouter)
app.use("/clientes", clientesRouter)
app.use("/proveedores", proveedoresRouter)
app.use('/product_entity', productentityRouter)
app.use('/insumos_entity', insumosentityRouter)
app.use('/insumos', insumosRouter)
app.use('/compra-presupuesto', compraPresupestoRouter)
app.use('/compra-preparacion', compraPreparacionRouter)
app.use('/compra-finalizacion', compraFinalizacionRouter)






app.listen(PORT, 
    async () => {
        await initializeDB();
        // await checkAdmin();
        console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`);
})


