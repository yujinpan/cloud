/**
 * 这是整个应用程序的路由状态。
 * 
 * 1.显示最外面的chrome（包括已认证用户的导航和注销）
 * 2.为子组件提供ui-view
 */
export const appState = {
    name: 'app',
    redirectTo: 'welcome',
    componet: 'app'
};

export const welcomeState = {
    parent: 'app',
    name: 'welcome',
    url: '/welcome',
    component: 'welcome'
};

export const loginState = {
    parent: 'app',
    name: 'login',
    url: '/login',
    component: 'login',
    resolve: {
        returnTo: returnTo
    }
};

/**
 * “登录”状态的解析函数，用于在成功登录后确定要返回的状态。
 *
 * 如果用户最初重定向到登录状态（由于requiresAuth重定向），则返回toState / params
 * 他们被重定向。 否则，如果他们直接转换，则返回fromState / params。 除此以外
 * 返回主“家”状态。
 */
returnTo.$inject = ['$transition$'];
function returnTo($transition$) {
    // 用户被重定向到登录状态（例如，在尝试激活联系人时通过requiresAuth挂钩）
    // 返回到原始的尝试目标状态（例如，联系人）
    if ($transition$.redirectedFrom() != null) {
        return $transition$.redirectedFrom().targetState();
    }

    let $state = $transition$.router.stateService;

    // 用户未被重定向到登录状态; 他们以某种方式直接激活登录状态。
    // 将它们返回到它们来自的状态。
    if ($transition$.from().name !== '') {
        return $state.target($transition$.from(), $transition$.params("from"));
    }

    // 如果fromState的名字是空的，那么这是最初的转换。 只要将它们返回到本地状态
    return $state.target('home');
}

export const messagesState = {
    parent: 'app',
    name: 'messages.**',
    url: '/messages',
    component: 'messages',
    data: {
        requiresAuth: true
    }
}