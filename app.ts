import  express ,{Request, Response} from "express";
import router from "./src/interfaces/routes/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from './src/docs/swagger-output.json' with {type: 'json'}

const app = express()

app.use(express.json())
app.use(router)

app.get("/", (request:Request, response:Response)=>{
  response.status(200).json({msg:"Rodando Projeto!"})
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

export default app
