import app from "./app.js";
import {config} from "./src/config/env.js"

const PORT = config.port

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})