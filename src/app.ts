import { Config } from './interface/config.interface';

class UniAuth {
  private configs: Array<Config> = [];

  constructor(config: Array<Config>) {}

  private fillDefaults(config: Config) {
    if (!config.endpoint) {
      config.endpoint = {
        auth: 'account/o/login',
        profile: 'account/o/access',
      };
    }
  }
}

const a = new UniAuth([{ name: 'uniauth', url: 'http://localhost:5000' }]);
