import * as https from 'https';

import { NextFunction, Request, Response } from 'express';

import { AuthenticationParams } from './interface/authenticate.interface';
import { Config } from './interface/config.interface';
import { getProfileData } from './minions/post.minion';

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

    /** by default, log the profile and move to next layer */
    if (!config.processor) {
      config.processor = (profile, next) => {
        console.log('profile >', profile);
        next();
      };
    }

    /** define default endpoints */
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
   * Express Middleware for initiating auth flow
   */
  public authenticate(name: string) {
    const config = this.getConfigByName(name);

    /** return an express middleware */
    return function (req: Request, res: Response, next: NextFunction) {
      const loginUrl = `${config.url}/${config.endpoint.auth}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}`;
      res.redirect(loginUrl);
      next();
    };
  }

  public callback(name: string, params?: AuthenticationParams) {
    const config = this.getConfigByName(name);

    /** return an express middleware */
    return async function (req: Request, res: Response, next: NextFunction) {
      const accessToken = req.query.access_token as string;
      const profileDetails = await getProfileData(config, accessToken);
      await config.processor(profileDetails, next);
    };
  }
}

export default UniAuth;
module.exports = UniAuth;
