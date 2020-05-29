//设置一个指向构造函数的
var that;
class Tab {
    constructor(id) {
        //用that代替this
        that = this;
        //获取整个Tab元素,这样才能精准获取其子元素
        this.main = document.querySelector(id)
        //获取+元素
        this.add = this.main.querySelector('.tabadd')
        //获取ul里面的第一个li方便调用
        this.ul = this.main.querySelector('.fisrstnav ul:first-child')
        //获取section的父元素
        this.fsection = this.main.querySelector('.tabscon')
        //调用初始化绑定的事件
        this.init()

    }
    //新增元素重新获取事件
    updataNode() {
        // 获取li元素
        this.lis = this.main.querySelectorAll('li')
        //获取section元素
        this.sections = this.main.querySelectorAll('section')
        //获取关闭的icon
        this.remove = this.main.querySelectorAll('.icon-guanbi')
        //获取修改的span
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
    }
    //初始化绑定事件
    init() {
        this.updataNode()
        //添加事件
        this.add.onclick = this.addTab
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i
            this.lis[i].index = i
            this.lis[i].onclick = this.toggleTab
            this.remove[i].onclick = this.removeTab
            this.spans[i].ondblclick = this.editTan
            this.sections[i].ondblclick = this.editTan
        }
    }
    //排他思想,清除功能
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = ''
            this.sections[i].className = ''
        }
    }
    //1.切换功能
    toggleTab() {
        // alert(1)测试专用
        //排他
        that.clearClass()
        this.className = 'liactive'
        that.sections[this.index].className = 'conactive'
    }
    //2.增加功能
    addTab() {
        that.clearClass()
        var random = Math.random()
        var li = '<li class="liactive"><span>测试专用</span><span class="iconfont icon-guanbi"></span></li>'
        var section = '<section class="conactive">测试' + random + '</section>'
        that.ul.insertAdjacentHTML('beforeend', li)
        that.fsection.insertAdjacentHTML('beforeend', section)
        that.init()
    }
    //3.删除功能
    removeTab(e) {
        e.stopPropagation()//阻止冒泡事件
        // alert('1')  //测试专用
        //设置index,把它的指
        var index = this.parentNode.index;
        that.lis[index].remove()
        that.sections[index].remove()
        //关闭其他的,不会切换
        if (document.querySelector('.liactive')) { return }
        //点击关闭就会自动点击最后那个
        index--;
        //关闭到最后不会出现错误 if比较麻烦,可以用布尔
        that.lis[index] && that.lis[index].click()


    }
    //4.修改功能
    editTan() {
        console.log('测试成功');
        //双击取消选中文字函数
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        //保存双击的值
        var str = this.innerHTML
        //改变当前值
        this.innerHTML = '<input type = "text" />'
        //寻找添加上去innerHTML的input位置
        var input = this.children[0]
        //然后把值赋给input
        input.value = str
        //自动全选
        input.select()
        //当前值离开之后
        input.onblur = function () {
            this.parentNode.innerHTML = this.value
        }
        //敲击回车键也可以onkeyup,添加一个事件处理函数 键盘回车代码13
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }



    }
}
new Tab('#tab')