import ShortnameData from '../models/shortname-data.model';

/**
 * Abstract class for shortname data access object
 * @Author Sam Henley
 */
export default abstract class ShortnameDao {
  /**
   * Create a new shortname record
   * @param shortnameData Shortname data to create
   */
  abstract create(shortnameData: ShortnameData): void;

  /**
   * Retrieve all shortname records
   */
  abstract getAll(): ShortnameData[];

  /**
   * Retrieve a shortname record by its shortname
   * @param shortname Shortname record to search for
   */
  abstract getByShortname(shortname: string): ShortnameData | null;

  /**
   * Delete a record by its shortname
   * @param shortname Shortname record to delete
   */
  abstract deleteByShortname(shortname: string): void;
}
