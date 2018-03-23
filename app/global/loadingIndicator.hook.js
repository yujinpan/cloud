/**
 * 此运行块注册一个Transition Hook，显示一个
 * 正在进行转换时加载指示器。
 */
export function loadingIndicatorHookRunBlock($transitions, LoadingIndicatorService) {
    $transitions.onStart(
        {/* match anything */},
        LoadingIndicatorService.showLoadingIndicator
    );
    $transitions.onFinish(
        {/* match anything */},
        LoadingIndicatorService.hideLoadingIndicator
    );
}
loadingIndicatorHookRunBlock.$inject = ['$transitions', 'LoadingIndicatorService'];