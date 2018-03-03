// 外部依赖
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';

// 定义主模块
const NG_MODULE = angular.module('ngmodule', [
    uiRouter, 
    uiBootstrap
]);

alert('Hello.');