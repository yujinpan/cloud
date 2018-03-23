// global style
import './global.less';

// service
import { AppConfig } from './appConfig.service';
import { AuthService } from './auth.service';
import { LoadingIndicatorService } from './loadingIndicator.service';
import { loadingIndicatorHookRunBlock } from './loadingIndicator.hook';
import { authHookRunBlock } from './requiresAuth.hook';

const GLOBAL_MODULE = angular.module('global', []);

GLOBAL_MODULE.service('AppConfig', AppConfig);
GLOBAL_MODULE.service('AuthService', AuthService);
GLOBAL_MODULE.service('LoadingIndicatorService', LoadingIndicatorService);

GLOBAL_MODULE.run(authHookRunBlock);
GLOBAL_MODULE.run(loadingIndicatorHookRunBlock);

export default GLOBAL_MODULE.name;