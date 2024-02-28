/**
 * Schema for data stored in Shortname table
 */
interface ShortnameData {
  /**
   * Shortname token for the URL
   */
  shortname: string;

  /**
   * Destination URL
   */
  destination: string;

  /**
   * Date the record was created
   */
  created: string;
};

export default ShortnameData;

