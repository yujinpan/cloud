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
    component: 'login'
};

export const messagesState = {
    parent: 'app',
    name: 'messages.**',
    url: '/messages',
    component: 'messages',
    data: {
        requiresAuth: true
    }
}