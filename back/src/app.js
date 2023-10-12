
// Requires
const express = require("express")
const { empleadosRouter } = require('./routes')
const { initializeDB } = require('./db/initializeDB');
const { verifyMailerConn } = require('./config/mailer.js');
const cors = require("cors");
const {checkAdmin} = require('./db/createAdminEntity')


// App Creation
const app = express();
const PORT = process.env.PORT || 3001;

// Aplication Middlewares
app.use(express.json()) 
app.use(cors());

// Routes
app.use("/empleados", empleadosRouter)



app.listen(PORT, 
    async () => {
        await initializeDB();
        // await checkAdmin();
        console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`);
})


