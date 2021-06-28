import {app} from "./controller/app";
import {leilaoRouter} from "./routes/leilaoRouter";

app.use("/leilao", leilaoRouter)

