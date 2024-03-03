import {Express, NextFunction, Request, Response} from 'express';
import shortnameDao from '../db/shortname-json.dao';
import {postShortnameValidator} from './shortname.validator';
import ShortnameData from '../models/shortname-data.model';
import SHORTNAME_BLACKLIST from '../const/shortname-blacklist.const';

/**
 * Registering routes for Shortname API
 * @param {Express} app Express app
 */
export default function shortnameRoutes(app: Express): void {
  app.get('/:shortname', (req: Request, res: Response, next: NextFunction) => {
    console.log('GET /:shortname');
    if (!req.params?.shortname) {
      console.log('No shortname provided, ignoring the request');
      next();
    }
    if (SHORTNAME_BLACKLIST.includes(req.params.shortname)) {
      console.log('Blacklisted shortname, ignoring the request');
      next();
    }
    try {
      console.log(`Attempting to resolve shortname ${req.params.shortname}`);
      const shortnameData = shortnameDao.getByShortname(req.params.shortname);
      if (shortnameData) {
        console.log(`Redirecting to ${shortnameData.destination}`);
        res.redirect(shortnameData.destination);
      } else {
        // Shortname record not found
        console.log('No Record Found');
        res.status(404).send('No Record Found');
      }
    } catch (error) {
      console.error('Error resolving shortname', error);
      res.status(500).send(error);
    }
  });

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
        console.error('Error retrieving shortname data', error);
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
          console.log(`Generating a random shortname: ${shortname}`);
        } else if (SHORTNAME_BLACKLIST.includes(shortname)) {
          console.error('Shortname is blacklisted');
          res.status(400).send('Shortname is not allowed');
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
        console.error('Error creating shortname', error);
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
        console.error('Error deleting shortname', error);
        res.status(500).send(error);
      }
    }
  );
}
