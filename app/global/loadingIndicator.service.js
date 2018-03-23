import angular from 'angular';

export class LoadingIndicatorService {
    constructor($document) {
        let body = $document.find('body');

        this.showLoadingIndicator = () => {
            body.append(angular.element(`
                <div id="loading" class="init-loading">
                    <i class="glyphicon glyphicon-refresh"></i>
                </div>
            `));
        };

        this.hideLoadingIndicator = () => {
            setTimeout(() => {
                let spinner = document.getElementById('loading');
                spinner.parentElement.removeChild(spinner);
            }, 400);
        };
    }
}
LoadingIndicatorService.$inject = ['$document'];