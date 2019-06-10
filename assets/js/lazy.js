(function(global){
  //变量下划线，函数驼峰，类匈牙利
  var lazy = {
    
    toggleClass: function(elem, cname){
      //toggle elem's class to cname
      var arr = elem.className.split(' ');
      for(var i = 0; i < arr.length; i++){
        if (arr[i] === cname) {
          arr.splice(i,1);
          elem.className = arr.join(' ');
          return false;
        }
      }
      arr.push(cname);
      elem.className = arr.join(' ');
      return false;
    }
    ,
    addClass: function(el, cname){
      var arr = el.className.split(' ');
      for(var i = 0; i < arr.length; i++){
        if(arr[i] === cname){
          return false;
        }
      }
      arr.push(cname);
      el.className = arr.join(' ');
      return false;
    }
    ,
    removeClass: function(el, cname){
      var arr = el.className.split(' ');
      for(var i = 0; i < arr.length; i++){
        if(arr[i] === cname){
          arr.splice(i,1);
          el.className = arr.join(' ');
          return false;
        }
      }
      return false;
    }
    //-------------------------------------------------------
    ,
    //-------------------------------------------------------
    showSpirits: function(){
      var style = document.createElement('style');
      style.innerHTML = "\
                          span.show-spirit{\
                          font-family: 'YouYuan';\
                          text-align: center;\
                          font-size: 22px;\
                          font-weight: bold;\
                          color: #f44;\
                          width: 50px;\
                          height: 40px;\
                          line-height: 40px;\
                        }\
                        ";
      document.head.appendChild(style);
      var show_arr = ['富强','民主','文明','和谐','自由','平等','公正',
                      '法制','爱国','敬业','诚信','友善'];
      document.addEventListener('click', starter);
      var i = 0;  //别处不要用

      function starter(e){
        var x = e.clientX;
        var y = e.clientY;
        showWord(show_arr[i], x, y);
        if (i<11) {i++}
        else {i = 0};
      }

      function showWord(text, x, y){
        var a = document.createElement('span');
        a.innerHTML = text;
        a.style.cssText = 'position: absolute; left:'+(x-25)+
                          'px; top:'+(y-20)+'px; opacity: 1;';
        a.className = 'show-spirit';
        document.body.appendChild(a);
        var time1 = setInterval(function (){
          var top_space = parseInt(a.style.top);
          a.style.top = (top_space-1) + 'px';
          a.style.opacity -= (1.1 - a.style.opacity)/20;
        }, 10);
        setTimeout(function (){
          clearInterval(time1);
          document.body.removeChild(a);
        }, 1000);
      }
      
      //屏蔽掉一些元素
      var no_spirit_col = document.querySelectorAll('.no-spirit');
      for(var j = 0; j < no_spirit_col.length; j++){
        no_spirit_col[j].addEventListener('click', function(e){
          e.stopPropagation();
        });
      }
    }
    //-------------------------------------------------------
    ,
    //-------------------------------------------------------
    tab: function(tab_obj){
      // {
      //   *switch: String,      tab开关
      //   *tab: String,         tab页
      //   event_open: String,  开启事件
      //   event_close: String  关闭事件
      // }
      try{
        var switch_string = tab_obj.switch;
        var tab_switch = document.querySelectorAll(switch_string);
        var tab_string = tab_obj.tab;
        var tab_col = document.querySelectorAll(tab_string);
        if(!tab_switch[0]) throw 'switch is undefined or wrong';
        if(!tab_col[0]) throw 'tab is undefined or wrong';
      }
      catch(err){
        console.log(err);
      }
      var event_open = tab_obj.event_open || 'mouseenter';
      var event_close = tab_obj.event_close || 'mouseleave';
      var indexOf = Array.prototype.indexOf;
      var toggleClass = lazy.toggleClass;
      
      for(var i = 0; i < tab_switch.length; i++){
        tab_switch[i].addEventListener('mouseenter', openTab);
        tab_switch[i].addEventListener('mouseleave', closeTab);
      }
      for(i = 0; i < tab_col.length; i++){
        tab_col[i].addEventListener('mouseenter', openTab);
        tab_col[i].addEventListener('mouseleave', closeTab);
      }
      
      function openTab(){
        //
        var index = indexOf.call(this.parentElement.children, this);
        toggleClass(tab_col[index], 'open-tab');
      }
      
      function closeTab(){
        var index = indexOf.call(this.parentElement.children, this);
        toggleClass(tab_col[index], 'open-tab');
      }
      
    }
    //------------------------------------------------
    ,
    //------------------------------------------------
    carousel: function(obj){
      /*
      {
        *wrap:      string  所有carousel相关元素的父元素
        *left_btn:  string  左按钮
        *right_btn: string  右按钮
        *dot:       string  小圆点集合（父元素只有该类子元素）
        *item：     string  滚动内容的集合（父元素只有该类子元素）
        anim:       string  [scroll|fade]
        speed:      int     动画时长，越短越快，默认500ms
        interval:   int     动画间隔时长，默认3000ms
      }
      */
      try{
        var carousel_wrap = document.querySelector(obj.wrap);
        var left_switch = document.querySelector(obj.left_btn);
        var right_switch = document.querySelector(obj.right_btn);
        var dot_list = document.querySelectorAll(obj.dot);
        var img_list = document.querySelectorAll(obj.item);
        if(!carousel_wrap)  throw 'wrap is undefined or error';
        if(!left_switch)  throw 'left_btn is undefined or error';
        if(!right_switch)  throw 'right_btn is undefined or error';
        if(!dot_list[0])  throw 'dot is undefined or error';
        if(!img_list[0])  throw 'item is undefined or error';
      }
      catch(err){
        console.log(err);
      }
      var index_now = 0;
      var img_count = img_list.length;
      var width = img_list[0].offsetWidth;
      var anim = obj.anim || 'scroll';
      var speed = obj.speed || 500;
      var scroll_interval = obj.interval || 3000;
      var indexOf = Array.prototype.indexOf;
      var toggleClass = lazy.toggleClass;
      
      if(anim === 'fade'){
        img_list.forEach(function(item, index){
          if(index === index_now){
            item.style.opacity = 1;
          }else{
            item.style.opacity = 0;
          }
        })
      }
      
      left_switch.addEventListener('click', leftOne);
      right_switch.addEventListener('click', rightOne);
      dot_list.forEach(function(item){
        item.addEventListener('click', which);
      });
      
      //自动滚动
      var t_handler = setInterval(rightOne, scroll_interval);
      carousel_wrap.addEventListener('mouseenter', function(){
        clearInterval(t_handler);
      });
      carousel_wrap.addEventListener('mouseleave', function(){
        t_handler = setInterval(rightOne, scroll_interval);
      });
      
      
      function which(e){
        var el = e.currentTarget;
        var index_new = indexOf.call(el.parentElement.children, el);
        if(index_new === index_now){
          return false;
        }else if(anim === 'scroll'){
          scroll(index_now, index_new);
        }else if(anim === 'fade'){
          fade(index_now, index_new);
        }
      }
      
      function leftOne(){
        if(index_now === 0){
          if(anim === 'scroll'){scroll(0, img_count-1);}
          else if(anim === 'fade'){fade(0, img_count-1);}
        }else{
          if(anim === 'scroll'){scroll(index_now, index_now-1);}
          else if(anim === 'fade'){fade(index_now, index_now-1);}
        }
      }
      
      function rightOne(){
        if(index_now === img_count-1){
          if(anim === 'scroll'){scroll(index_now, 0);}
          else if(anim === 'fade'){fade(index_now, 0);}
        }else{
          if(anim === 'scroll'){scroll(index_now, index_now+1);}
          else if(anim === 'fade'){fade(index_now, index_now+1);}
        }
      }
      
      function scroll(i_now, i_new){
        //动画时解除事件绑定
        right_switch.removeEventListener('click', rightOne);
        left_switch.removeEventListener('click', leftOne);
        dot_list.forEach(function(item){
          item.removeEventListener('click', which);
        });
        var space = width/(speed/10);
        if(i_now === img_count-1 && i_new === 0){
          var sign = 1;
        }else if(i_now === 0 && i_new === img_count-1){
          var sign = -1;
        }else if(i_now < i_new){
          var sign = 1;
        }else{
          sign = -1;
        }
        var style_now = img_list[i_now].style;
        var style_new = img_list[i_new].style;
        style_now.left = 0;
        style_new.left = sign*width + 'px';
        style_new.zIndex = 1;
        var th = setInterval(function(){
          var now_left = parseInt(style_now.left);
          var new_left = parseInt(style_new.left);
          style_now.left = (now_left-=space*sign) + 'px';
          style_new.left = (new_left-=space*sign) + 'px';
          if(new_left*sign <= 0){
            style_new.left = 0;
            style_now.left = 0;
            style_now.zIndex = 0;
            toggleClass(dot_list[i_now], 'selected');
            toggleClass(dot_list[i_new], 'selected');
            index_now = i_new;
            //结束后重新绑定
            left_switch.addEventListener('click', leftOne);
            right_switch.addEventListener('click', rightOne);
            dot_list.forEach(function(item){
              item.addEventListener('click', which);
            });
            clearInterval(th);
          }
        }, 10)
        return false;
      }
      
      function fade(i_now, i_new){
        right_switch.removeEventListener('click', rightOne);
        left_switch.removeEventListener('click', leftOne);
        dot_list.forEach(function(item){
          item.removeEventListener('click', which);
        });
        var o_now = 1;
        var o_new = 0;
        var style_now = img_list[i_now].style;
        var style_new = img_list[i_new].style;
        var space = 1/(speed/10);
        var th = setInterval(function(){
          style_now.opacity = (o_now-=space);
          style_new.opacity = (o_new+=space);
          if(o_new >= 1){
            style_new.opacity = 1;
            style_now.opacity = 0;
            toggleClass(dot_list[i_now], 'selected');
            toggleClass(dot_list[i_new], 'selected');
            index_now = i_new;
            left_switch.addEventListener('click', leftOne);
            right_switch.addEventListener('click', rightOne);
            dot_list.forEach(function(item){
              item.addEventListener('click', which);
            });
            clearInterval(th);
          }
        }, 10);
      }
    }
    
  }//lazy
  
  global.lazy = lazy;
})(this);