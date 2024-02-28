import ShortnameData from '../models/shortname-data.model';
import ShortnameTable from '../models/shortname-table.model';
import ShortnameDao from './shortname.dao';
import fs from 'fs';

/**
 * Implementation of the ShortnameDao using a JSON file
 * @Author Sam Henley
 */
class ShortnameJsonDao extends ShortnameDao {
  private readonly DB_FILE = 'shortname-db.json';

  private db: ShortnameTable | null = null;

  /**
   * Create the DAO instance, initialize the database
   */
  constructor() {
    super();
    console.log('Initializing ShortnameJsonDao');
    this.init();
  }

  /* ******************** Public Methods ******************** */

  /**
   * @InheritDoc
   */
  public create(shortnameData: ShortnameData): void {
    console.log(`Creating shortname ${shortnameData.shortname}`);

    this.read();
    if (!this.db) {
      console.error('Error loading shortname data');
      throw new Error('Error loading shortname data');
    }

    this.db[shortnameData.shortname] = shortnameData;
    this.save();
  }

  /**
   * @InheritDoc
   */
  public getAll(): ShortnameData[] {
    console.log('Retrieving all shortnames');

    this.read();
    if (!this.db) {
      console.error('Error loading shortname data');
      throw new Error('Error loading shortname data');
    }

    return Object.values(this.db);
  }

  /**
   * @InheritDoc
   */
  public getByShortname(shortname: string): ShortnameData | null {
    console.log(`Retrieving shortname ${shortname}`);

    this.read();
    if (!this.db) {
      console.error('Error loading shortname data');
      throw new Error('Error loading shortname data');
    }

    return this.db[shortname] || null;
  }

  /**
   * @InheritDoc
   */
  public deleteByShortname(shortname: string): void {
    console.log(`Deleting shortname ${shortname}`);

    this.read();
    if (!this.db) {
      console.error('Error loading shortname data');
      throw new Error('Error loading shortname data');
    }

    delete this.db[shortname];
    this.save();
  }

  /* ******************** Private Methods ******************** */

  /**
   * Check for the database file. If it does not exist, create it.
   * If it exists, load the data into memory.
   */
  private init(): void {
    console.log('Initializing Shortname DB');
    if (!fs.existsSync(this.DB_FILE)) {
      console.log(`DB file ${this.DB_FILE} does not exist. Creating...`);
      fs.writeFileSync(this.DB_FILE, JSON.stringify({}));
      this.db = {};
    } else {
      console.log(`DB file ${this.DB_FILE} exists`);
      this.read();
    }
  }

  /**
   * Convenience method to load the database file to memory
   */
  private read(): void {
    console.log(`Loading DB file ${this.DB_FILE}`);
    try {
      this.db = JSON.parse(fs.readFileSync(this.DB_FILE).toString());
      console.log(`DB file ${this.DB_FILE} loaded`);
    } catch (e) {
      console.error(`Error loading DB file ${this.DB_FILE}: ${e}`);
      this.db = null;
    }
  }

  /**
   * Convenience method to save the database file to disk
   */
  private save(): void {
    console.log(`Saving DB file ${this.DB_FILE}`);
    try {
      fs.writeFileSync(this.DB_FILE, JSON.stringify(this.db));
      console.log(`DB file ${this.DB_FILE} saved`);
    } catch (e) {
      console.error(`Error saving DB file ${this.DB_FILE}: ${e}`);
    }
  }
}

export default new ShortnameJsonDao();
