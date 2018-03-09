/**
 * main-module
 */
import { app } from './app.component';
import { login } from './login.component';
import { home } from './home.component';
import { welcome } from './welcome.component';
import { messages } from './messages.component';

import { appState, welcomeState, loginState, messagesState } from './app.states';

const MAIN_MODULE = angular.module('main', []);

MAIN_MODULE.config(['$uiRouterProvider', ($uiRouter) => {
    // 启用每个TRANSITION的跟踪...（检查javascript控制台）
    // 这个语法`$ trace.enable（1）`是`$ trace.enable（“TRANSITION”）`的替代。
    // 除了“TRANSITION”，您还可以启用跟踪：“RESOLVE”，“HOOK”，“INVOKE”，“UIVIEW”，“VIEWCONFIG”
    $uiRouter.trace.enable(1);

    // 如果用户输入的URL与任何已知的URL（状态）都不匹配，则将它们发送到`/ welcome`
    const $urlService = $uiRouter.urlService;
    $urlService.rules.otherwise({ state: 'welcome' });

    const $stateRegistry = $uiRouter.stateRegistry;
    $stateRegistry.register(appState);
    $stateRegistry.register(welcomeState);
    $stateRegistry.register(loginState);
    $stateRegistry.register(messagesState);
}]);

MAIN_MODULE.component('app', app);
MAIN_MODULE.component('login', login);
MAIN_MODULE.component('home', home);
MAIN_MODULE.component('welcome', welcome);
MAIN_MODULE.component('messages', messages);

export default MAIN_MODULE.name;