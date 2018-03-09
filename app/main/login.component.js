/**
 * loginComponent的controller
 */
class LoginController {
    constructor($state) {
        this.name = 'Richard';
    }
}
LoginController.$inject = ['$state'];

// login component
export const login = {
    controller: LoginController,
    template:`
        <h1>Login {{$ctrl.name}}.</h1>
        <div class="input-group">
            <label class="col-sm-3">user(myself@angular.dev)</label>
            <div class="col-sm-9">
                <input>
            </div>
        </div>
        <div class="input-group">
            <label class="col-sm-3">password</label>
            <div class="col-sm-9">
                <input>
            </div>
        </div>
        <button type="button" class="btn btn-primary">submit</button>
    `
};