/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-30 17:50:31
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-30 22:06:11
 * @FilePath: \20210105-main\js\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
window.addEventListener('load', function() {
    // 1、获取元素
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var ul = focus.querySelector('ul');
    var ol = document.querySelector('.circle');
    // 获取相框的宽度
    var focusWidth = focus.offsetWidth;
    var circle = 0;
    var num = 0;
    // 鼠标经过轮播图时，左右按钮显示
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 鼠标经过轮播图时，停止轮播
        clearTimeout(timer);
        timer = null; // 清除定时器变量
    });
    // 鼠标离开轮播图时，左右按钮隐藏
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 鼠标离开轮播图时,开启定时器
        timer = setInterval(function() {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    //动态生成小圆圈  有几张图片，我就生成几个小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做 
        li.setAttribute('index', i);
        // 把小li插入到ol 里面
        ol.appendChild(li);
        // 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            // 干掉所有人 把所有的小li 清除 current 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'current';
            // 点击小圆圈，移动图片 当然移动的是 ul 
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            // circle = index;
            ul.style.left = -index * focusWidth + "px";
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;


        });
    }
    ol.children[0].className = 'current';
    // 添加右侧按钮点击事件
    arrow_r.addEventListener('click', function() {
        // 当小圆点在最后一个时，点击右侧按钮应该跳到第一张轮播图
        // 点击右侧按钮时，先获取图片下面小圆点的索引
        num++;
        if (num == ul.children.length) {
            num = 0;
        }
        ul.style.right = "";
        ul.style.left = -num * focusWidth + "px";
        for (var i = 0; i < ul.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[num].className = 'current';
    });

    // 添加左侧按钮点击事件
    arrow_l.addEventListener('click', function() {
        // 当小圆点在第一个时，点击左侧按钮应该跳到最后一张轮播图
        if (num == 0) {
            num = ul.children.length;
        }
        // 点击左侧按钮时，先获取图片下面小圆点的索引
        num--;
        ul.style.left = "";
        ul.style.right = num * focusWidth + "px";
        for (var i = 0; i < ul.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[num].className = 'current';
    });

    // 自动轮播
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);
})