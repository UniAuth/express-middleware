import { NextFunction, Request, Response } from 'express';

import { AuthenticationParams } from './interface/authenticate.interface';
import { Config } from './interface/config.interface';

class UniAuth {
  private configs: Array<Config> = [];

  constructor(configs: Array<Config>) {
    this.configs = configs;
    this.configs.forEach((config) => this.fillDefaults(config));
  }

  /**
   * Method to fill default values and ensure that params are passed right
   * @param config Config parameter passed by user
   */
  private fillDefaults(config: Config) {
    if (!config.name || !config.url) {
      throw new Error('name and url required');
    }

    if (!config.endpoint) {
      config.endpoint = {
        auth: 'account/o/login',
        profile: 'account/o/access',
      };
    }
  }

  /**
   * Returns the config by searching the passed values by name
   * @param string name :: name of config object to use
   */
  private getConfigByName(name: string): Config {
    const item = this.configs.filter((item) => item.name === name);
    if (item.length === 0) {
      throw new Error(`Config named ${name} was not found`);
    } else if (item.length > 1) {
      throw new Error(`Configs with duplicate name :: ${name} found`);
    } else {
      return item[0];
    }
  }

  /**
   * Express Middleware
   */
  public authenticate(name: string, params?: AuthenticationParams) {
    const config = this.getConfigByName(name);

    /** return an express middleware */
    return function (req: Request, res: Response, next: NextFunction) {
      const loginUrl = `${config.url}/${config.endpoint.auth}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}`;
      res.redirect(loginUrl);
      next();
    };
  }
}
