/**
 * List of tokens that should not be considered for generating or resolving shortnames
 */
const SHORTNAME_BLACKLIST: string[] = [
  'api',
  'index.html',
  'add.html',
  'list.html',
];

export default SHORTNAME_BLACKLIST;
