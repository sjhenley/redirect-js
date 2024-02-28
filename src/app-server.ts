import express, {Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
