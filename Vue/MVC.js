const myApp = {};
// model 模型
myApp.Model = class Model {
    // 业务数据
    val = 0
    // 视图
    views = []

    // -------------业务操作-------------
    add(v) {
        if (this.val < 100) this.val += v
    }
    sub(v) {
        if (this.val > 0) this.val -= v
    }
    getVal() {
        return this.val
    }
    // -------------业务操作-------------

    // -------------观察者模式-------------
    // 注册视图
    register(view) {
        this.views.push(view)
    }
    // 更新所有视图
    notify() {
        for (let i = 0; i < this.views.length; i++) {
            this.views[i].render(this)
        }
    }
    // -------------观察者模式-------------
}
// view 视图
myApp.View = class View {
    $num = document.querySelector('#num')
    $incBtn = document.querySelector('#incBtn')
    $decBtn = document.querySelector('#decBtn')

    constructor(controller) {
        // 绑定事件
        this.$incBtn.addEventListener('click', controller.increase)
        this.$decBtn.addEventListener('click', controller.decrease)
    }
    // 将 model 上的数据 绑定到 dom 上
    render(model) {
        this.$num.textContent(model.getVal() + 'rmb')
    }

};
// controller 控制器 连接和控制 view 与 model
myApp.Controller = class Controller {
    model = null;
    view = null;

    init() {
        // 初始化 model 与 view
        this.model = myApp.Model()
        this.view = myApp.View(this)

        // 将 view 注册到 model 中（这样当 model 更新就会去通知 view 了）
        this.model.register(this.view)
        this.model.notify()
    }

    // 通过操作 model 数据 更新 view
    increase() {
        this.model.add(1)
        this.model.notify()
    }

    decrease() {
        this.model.sub(1)
        this.model.notify()
    }

};


// init 
(function () {
    const controller = new myApp.Controller()
    controller.init()
})()