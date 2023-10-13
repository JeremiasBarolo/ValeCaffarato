
// Requires
const express = require("express")
const { empleadosRouter, clientesRouter, proveedoresRouter,productentityRouter } = require('./routes')
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



app.listen(PORT, 
    async () => {
        await initializeDB();
        // await checkAdmin();
        console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`);
})


