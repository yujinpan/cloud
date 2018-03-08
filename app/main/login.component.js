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
export default {
    controller: LoginController,
    template:`
        <h1>Login {{$ctrl.name}}.</h1>
        
        <div class="input-group">
            <label class="col-sm-3">user</label>
            <div class="col-sm-9">
                <input>
            </div>
        </div>
        
    `
};