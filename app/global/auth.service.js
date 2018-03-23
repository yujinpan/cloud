/**
 * 此服务模拟身份验证服务
 */
export class AuthService {
    constructor(AppConfig, $q, $timeout) {
        this.AppConfig = AppConfig;
        this.$q = $q;
        this.$timeout = $timeout;
        this.username = [
            'myself@angular.dev',
            'devgal@angular.dev',
            'devguy@angular.dev'
        ];
    }

    /**
     * 如果用户当前已通过身份验证，则返回true，否则返回false
     */
    isAuthenticated() {
        let state = !!this.AppConfig.emailAddress;
        console.log('认证结果：' + state);
        return state;
    }

    /**
     * 假认证函数，返回已解决或拒绝的承诺。
     * 
     * 给定用户名和密码，检查用户名是否与已知的用户名匹配
     * 用户名（this.usernames），并且密码与“密码”相匹配
     * 
     * 延迟800ms来模拟异步REST API延迟
     */
    authenticate(username, password) {

        // 结构this
        let { $timeout, $q, AppConfig } = this;

        // 检查用户名是否是已知的用户名之一，密码是”password“
        const checkCredentials = () => $q((resolve, reject) => {
            var validUsername = this.usernames.indexOf(username) !== -1;
            var validPassword = password === 'password';

            return (validUsername && validPassword) ? resolve(username) : reject("Invalid username or password.");
        });

        return $timeout(checkCredentials, 800)
            .then((authenticatedUser) => {
                AppConfig.emailAddress = authenticatedUser;
                AppConfig.save();
            });
    }

    /**
     * 记录当前用户
     */
    logout() {
        this.AppConfig.emailAddress = undefined;
        this.AppConfig.save();
    }
}
AuthService.$inject = ['AppConfig', '$q', '$timeout'];