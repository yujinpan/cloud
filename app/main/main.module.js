/**
 * main-module
 */
// component
import login from './login.component';

const MAIN_MODULE = angular.module('main', []);

MAIN_MODULE
.component('login', login);

export default MAIN_MODULE.name;