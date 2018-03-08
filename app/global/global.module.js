// global style
import './global.less';

// service
import { AppConfig } from './appConfig.service';
import { AuthService } from './auth.service';

const GLOBAL_MODULE = angular.module('global', []);

GLOBAL_MODULE.service('AppConfig', AppConfig);
GLOBAL_MODULE.service('AuthService', AuthService);

export default GLOBAL_MODULE.name;