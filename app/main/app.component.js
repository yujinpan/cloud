/**
 * app component ctrl
 */
class AuthedController {
    constructor(AppConfig, AuthService, $state){
        this.AuthService = AuthService;
        this.$state = $state;

        this.emailAddress = AppConfig.emailAddress;
        this.isAuthenticated = AuthService.isAuthenticated();
    }

    logout() {
        let { AuthService, $state } = this;
        AuthService.logout();
        // 认证更改后重新加载状态
        return $state.go('welcome', {}, { reload: true });
    }

    isActive(glob) {
        return this.$state.includes(glob);
    }
}
AuthedController.$inject = ['AppConfig', 'AuthService', '$state'];

/**
 * 这是经过身份验证的用户的主要应用程序组件。
 * 
 * 此组件呈现最外面的chrome（应用程序标题和选项卡，撰写和注销按钮）
 * 它有一个嵌套状态填充的”ui-view“视口。
 */
export const app = {
    constroller: AuthedController,
    template: `
        <div class="navheader">
            <ul>
                <li>comment</li>
                <li>user</li>
                <li>star</li>
            </ul>
        </div>
        <ui-view></ui-view>
    `
};