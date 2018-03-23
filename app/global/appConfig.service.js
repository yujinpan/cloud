/**
 * 此服务在会话存储中存储和检索用户首选项
 */
export class AppConfig {
    constructor() {
        this.sort = '+date';
        this.emailAddress = undefined;
        this.restDelay = 100;
        this.load();
    }

    load() {
        try {
            return angular.extend(this, angular.fromJson(sessionStorage.getItem("appConfig")));
        } catch (Error) { }

        return this;
    }

    save() {
        sessionStorage.setItem("appConfig", angular.toJson(angular.extend({}, this)));
    }
}