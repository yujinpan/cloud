import './style.less';
import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import uibootstrap from 'angular-ui-bootstrap';

// 模拟加载
(()=>{
    setTimeout(() => {
        document.getElementById('main').setAttribute('style', '');
        document.getElementById('loading').remove();
    }, 300);
})();

// 检查是否在生产环境
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}