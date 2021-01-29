/**
 * interface to define config of middleware
 */
export interface Config {
  name: string;

  url: string;

  /** option method to set custom endpoints if using modified server */
  endpoint?: {
    auth: string;
    profile: string;
  };
}
