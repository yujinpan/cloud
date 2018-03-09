// 这是验证用户的主页组件。
// 它显示巨大的按钮来激活它们各自的子模块：消息，联系人，首选项
export const home = {
    template: `
      <div class="home buttons">
        <button ui-sref="mymessages" class="btn btn-primary">
          <h1><i class="fa fa-envelope"></i></h1>
          <h1>Messages</h1>
        </button>
  
        <button ui-sref="contacts" class="btn btn-primary">
        <h1><i class="fa fa-users"></i></h1>
        <h1>Contacts</h1>
        </button>
  
        <button ui-sref="prefs" class="btn btn-primary">
          <h1><i class="fa fa-cogs"></i></h1>
          <h1>Preferences</h1>
        </button>
      </div>
    `
};