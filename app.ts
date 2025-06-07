import  express ,{Request, Response} from "express";


const app = express()

app.use(express.json())

app.get("/", (request:Request, response:Response)=>{
  response.status(200).json({msg:"Rodando Projeto!"})
})

export default app;