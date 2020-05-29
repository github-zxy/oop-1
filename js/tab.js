var that;//设置切换功能section的this指向
class Tab {
    constructor(id) {
        that = this;//设置空指向,指向constructor
        this.main = document.querySelector(id)
        this.add = this.main.querySelector('.tabadd')

        //获取ul
        this.ul = this.main.querySelector('.fisrstnav ul:first-child')
        //获取section的父类
        this.fsection = this.main.querySelector('.tabscon')
        this.init()
    }
    //为了可以重新绑定li和section而单独设置的函数
    updata() {
        this.lis = this.main.querySelectorAll('li')
        this.section = this.main.querySelectorAll('section')
        //获取关闭按钮
        this.remove = this.main.querySelectorAll('.icon-guanbi')
        //获取span元素
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
    }
    //初始化页面,并且绑定事件
    init() {
        this.updata()
        that.add.onclick = this.addTab
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i
            this.lis[i].onclick = this.toggleTab
            this.remove[i].onclick = this.removeTab
            this.spans[i].ondblclick = this.editTan
            this.section[i].onclick = this.editTan
        }
    }

    //1.切换功能
    toggleTab() {
        //使用排他思想,先清除,在点击
        that.clearClass()//that主要是指向constructor的this
        // console.log(this.index); // 打印点击的索引号
        this.className = 'liactive'
        that.section[this.index].className = 'conactive'

    }
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = ''
            this.section[i].className = ''
        }
    }
    //2.增加功能
    addTab() {
        that.clearClass()
        //设置添加的一个字符串
        var random = Math.random()
        var li = '<li class="liactive"><span>测试专用</span><span class="iconfont icon-guanbi"></span></li>'
        var section = '<section class="conactive">测试' + random + '</section>'
        //使用这个字符穿
        that.ul.insertAdjacentHTML('beforeend', li)
        that.fsection.insertAdjacentHTML('beforeend', section)
        that.init()//重新给新增加的li和section初始化绑定事件
    }
    //3.删除功能
    removeTab(e) {
        e.stopPropagation()//阻止冒泡 防止触发li 的切换事件
        var index = this.parentNode.index;
        console.log(index);
        //添加删除操作
        that.lis[index].remove()
        that.section[index].remove()
        //如果删除其他的,就不需要执行以下自动切换代码
        if (document.querySelector('.liactive')) { return }
        //主要使用它父亲的索引号来操作事件,删除之后,显示前一个
        index--;
        //用与判断索引号的正确
        that.lis[index] && that.lis[index].click()//自动调用点击函数

    }
    //4.修改功能
    editTan() {
        //双击取消选中文字函数
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        console.log('测试成功');
        //保存双击前的值
        var str = this.innerHTML
        //双击后显示input值
        this.innerHTML = '<input type="text" />'
        //寻找添加input值上去的位置
        var input = this.children[0]
        //把值赋给添加上去位置的
        input.value = str
        //离开之后
        input.onblur = function () {
            this.parentNode.innerHTML = this.value
        }
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur()
            }
        }

    }
}
new Tab('#tab')