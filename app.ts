import  express ,{Request, Response} from "express";
import router from "./src/interfaces/routes/index.js";

const app = express()

app.use(express.json())
app.use(router)

app.get("/", (request:Request, response:Response)=>{
  response.status(200).json({msg:"Rodando Projeto!"})
})

export default app;