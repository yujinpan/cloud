/**
 * loginComponent的controller
 */
class LoginController {
    constructor($state, LoadingIndicatorService, AuthService) {
        this.$state = $state;
        this.LoadingIndicatorService = LoadingIndicatorService;
        this.AuthService = AuthService;
    }
    submit() {
        const returnToOriginalState = () => {
            let state = this.returnTo.state();
            let params = this.returnTo.params();
            let options = Object.assign({}, this.returnTo.options(), { reload: true });
            $state.go(state, params, options);
        };
        this.AuthService.authenticate(this.username, this.password)
            .then(returnToOriginalState);
    }
}
LoginController.$inject = ['$state', 'LoadingIndicatorService', 'AuthService'];

// login component
export const login = {
    controller: LoginController,
    bindings: {
        returnTo: '<'
    },
    template: `
        <h1>Login myself@angular.dev,devgal@angular.dev,devguy@angular.dev</h1>
        <div class="input-group">
            <label class="col-sm-3">user(myself@angular.dev)</label>
            <div class="col-sm-9">
                <input placeholder="your username" ng-model="$ctrl.username">
            </div>
        </div>
        <div class="input-group">
            <label class="col-sm-3">password</label>
            <div class="col-sm-9">
                <input placeholder="password" ng-model="$ctrl.password">
            </div>
        </div>
        <button type="button" class="btn btn-primary" ng-click="$ctrl.submit()">submit</button>
    `
};