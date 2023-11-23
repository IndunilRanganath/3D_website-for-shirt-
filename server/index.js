import  Express  from "express";

import * as dotenv from "dotenv";
import cors from "cors";
import dalleRoutes from "./routes/dalle.routes.js";

dotenv.config();


const app = Express();
app.use(cors());
app.use(Express.json({limig: "50mb"}));

app.use('/api/v1/dalle', dalleRoutes);

app.get("/", (req, res) => {
    res.status(200).json({message: "Hello World"})
});


app.listen(8080, () => {
    console.log("Server is running on port 8080");
})
