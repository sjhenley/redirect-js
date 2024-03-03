import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import shortnameRoutes from './api/shortname.routes';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
  res.redirect('/index.html');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

shortnameRoutes(app);
