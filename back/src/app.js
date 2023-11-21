
// Requires
const express = require("express")
const { 
    personasRouter,
    productentityRouter, 
    insumosentityRouter, 
    insumosRouter,
    pedidosRouter,
    cantidadesRouter,
    productosRouter
 } = require('./routes')
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
app.use("/personas", personasRouter)
app.use('/product_entity', productentityRouter)
app.use('/insumos_entity', insumosentityRouter)
app.use('/insumos', insumosRouter)
app.use('/pedidos', pedidosRouter)
app.use('/cantidades', cantidadesRouter)
app.use('/productos', productosRouter)






app.listen(PORT, 
    async () => {
        await initializeDB();
        // await checkAdmin();
        console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`);
})


