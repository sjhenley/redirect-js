import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import shortnameRoutes from './api/shortname.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

shortnameRoutes(app);
