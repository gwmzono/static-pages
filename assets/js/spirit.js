/*
**立即执行函数，防止污染全局变量
**使用该插件会覆盖样式：span.show-spirit
*/
;(function(global){
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
  var show_arr = ['富强','民主','文明','和谐','自由','平等','公正','法制',
                  '爱国','敬业','诚信','友善'];
  document.addEventListener('click', starter);
  var i = 0;  //别处不要用！！！

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
})(this);