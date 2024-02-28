import {Request, Response, NextFunction} from 'express';

/**
 * Validates the request body for the POST /shortname endpoint
 * If request body is valid, passes to the next middleware
 * If request body is invalid, sends a 400 response
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
*/
export function postShortnameValidator(req: Request, res: Response, next: NextFunction): void {
  console.log('Validating POST /shortname');
  const errors = [];
  // Destination is required and must be a string
  // TODO: Destination must be a valid URL
  if (!req.body?.destination || typeof req.body?.destination !== 'string') {
    errors.push('Destination is invalid');
  }

  // Shortname is not required, but if it is included, it must be a string
  if (req.body.shortname && typeof req.body?.shortname !== 'string') {
    errors.push('Shortname is invalid');
  }

  if (errors.length) {
    const errorMessage = errors.join('; ');
    console.log(`Validation failed: ${errorMessage}`);
    res.status(400).send(errorMessage);
  } else {
    console.log('Validation passed');
    next();
  }
}
