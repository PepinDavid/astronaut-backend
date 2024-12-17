import express from "express";
import cors from "cors";
import { appRouter } from "./routes";
import sequelize from "./config/db.config";

startServer();

const app = express();
const corsOptions = {
    origin: "*",
}

app.use([
    cors(corsOptions),
    express.json(),
]);


app.use('/api', appRouter);

async function startServer() {
    try {
      await sequelize.authenticate(); // Teste la connexion
      console.log('Connection to the database established successfully.');
  
      await sequelize.sync({ force: false }); // Crée ou met à jour les tables
      console.log('Database synchronized.');
  
      // Lancer le serveur ici
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };

export default app;