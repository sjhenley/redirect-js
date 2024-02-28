import {Express, Request, Response} from 'express';
import shortnameDao from '../db/shortname-json.dao';
import {postShortnameValidator} from './shortname.validator';
import ShortnameData from '../models/shortname-data.model';

/**
 * Registering routes for Shortname API
 * @param {Express} app Express app
 */
export default function shortnameRoutes(app: Express): void {
  app.get(
    '/api/shortname/:shortname?',
    (req: Request, res: Response) => {
      console.log('GET /api/shortname/:shortname');
      try {
        if (req.params.shortname) {
          // Client is requesting a specific shortname
          const data = shortnameDao.getByShortname(req.params.shortname);
          if (data) {
            res.status(200).send(data);
          } else {
            // Shortname record not found
            res.status(404).send();
          }
        } else {
          // Client is requesting all shortnames
          const data = shortnameDao.getAll();
          res.status(200).send(data);
        }
      } catch (error) {
        res.status(500).send(error);
      }
    }
  );

  app.put(
    '/api/shortname',
    postShortnameValidator,
    (req: Request, res: Response) => {
      console.log('PUT /api/shortname');
      try {
        // If shortname is not provided, generate one
        let shortname = req.body.shortname;
        if (!shortname) {
          shortname = Math.random().toString(36).substring(2, 10);
        }

        // Generate the creation timestamp
        const timestamp = new Date().toISOString();
        const item: ShortnameData = {
          shortname,
          destination: req.body.destination,
          created: timestamp,
        };

        // Register the shortname
        shortnameDao.create(item);
        res.status(201).send(item);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  );

  app.delete(
    '/api/shortname/:shortname',
    (req: Request, res: Response) => {
      console.log('DELETE /api/shortname/:shortname');
      try {
        shortnameDao.deleteByShortname(req.params.shortname);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error);
      }
    }
  );
}