/**
 * 这个运行模块注册一个转换挂钩，用于保护需要认证的路由。
 *  
 * 一下两种情况下，此挂接将重定向到/login：
 *  - 用户未通过身份验证
 *  - 用户正在跳转到需要验证的状态
 */
export function authHookRunBlock($transitions, AuthService) {
    // 匹配目标状态的数据属性是否存在'requiresAuth'
    let requiresAuthCriteria = {
        to: (state) => state.data && state.data.requiresAuth
    };

    // 返回当前转换到登录状态的重定向的函数
    // 如果用户当前未通过身份验证（根据AuthService）

    let redirectToLogin = (transition) => {
        let AuthService = transition.injector().get('AuthService');
        let $state = transition.router.stateService;
        if (!AuthService.isAuthenticated()) {
            return $state.target('login', undefined, { location: true });
        }
    };

    // 用TransitionsService注册“require auth”钩子
    $transitions.onBefore(requiresAuthCriteria, redirectToLogin, { priority: 10 });
}
authHookRunBlock.$inject = ['$transitions', 'AuthService']; 