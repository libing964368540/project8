
var header =(function () {
    var _m={};
    var self=_m;
    //初始化
    _m.init=function () {
           self.navInit();
           self.move();
           self.nav();
           self.navClick();
           self.Backstage();
       }
    //导航的初始化
    _m.navInit = function () {
        $.axse(urls + "/portClassify/ClassifyList",'', function(result) {
            var navDate= result;
                console.log(navDate);
            for(var i=0;i<navDate.length;i++){

                self.Twostart(navDate[i],i);
            }
        },function () {

        })
    }
    //初始化二级目录的操作
    _m.Twostart=function (obj,i) {
        var ListClassifySon=obj.ListClassifySon;

        if(ListClassifySon){
            var dom='';
            for(var j=0;j<ListClassifySon.length; j++){
                dom+='<dd data-id='+ListClassifySon[j].ClassifyId+'>'+ListClassifySon[j].ClassifyName+'</dd>';
            }
            $('.header .nav ul li').eq(obj.ClassifyId).find('dl').append(dom).hide();
            $('.header .nav ul li').eq(obj.ClassifyId).attr('id',obj.ClassifyId);
            if(i==0){
                $('.header .nav ul li').eq(8).find('dl').append(dom).hide();
                $('.header .nav ul li').eq(obj.ClassifyId).attr('id',obj.ClassifyId);
            }
            if(i==7){
                $('.header .nav ul li').eq(7).find('dl').append(dom).hide();
                $('.header .nav ul li').eq(obj.ClassifyId).attr('id',obj.ClassifyId);
            }
            self.over();
            self.out();
            self.twoNavClick();
        }

    }
    //add二级目录
    

    //首页显示栏目
    _m.Articlelist = function () {
        $.axse(urls + "/portClassify/ClassifyIsHome",'', function(result) {
                 var list=result;
                     list.splice(1,1);
                     console.log(list);
                for(var i=0;i<list.length;i++){
                   $('#shouye dl').eq(i).find('dt .ClassifyName').text(list[i].ClassifyName);
                    self.Article(list[i].ClassifyId,$('#shouye dl').eq(i));
                }
        },function () {

        })
    }
    //首页栏目文章
    _m.Article = function (data,obj) {
           console.log(data);
        var params = {
            ClassifyId:data,
            PageSize:10
        };
        $.axse(urls + "/portArticle/ArticleInHome",params, function(result) {
            var list=result;
                if(list.length!=0){
                    var dom='';
                   for(var i=0;i<list.length;i++){
                      dom+= '<li class="clear" data='+data+' data-id='+list[i].ArticleId+'><i></i><p class="lf">'+list[i].ArticleTitle+'</p><span class="rg">'+ChangeDateTime(list[i].ArticleTime,2)+'</span></li>'
                   }
                   obj.find('dd ul').append(dom);

                    self.lookSearch();
                }else{

                    var dom = '<span>暂无数据</span>';
                    obj.find('dd ul').append(dom);
                }
        },function () {

        })
    }
    _m.move=function () {
        //解决兼容浏览器放大缩小头部旷度问题
           $(window).on('resize',function () {
               self.Widths('100%');
           })
           $(window).on('scroll',function () {
               var widths=$(this).width();
               var lefts=$(this).scrollLeft();
                   widths=widths+lefts;
                   self.Widths(widths);
           })
       }
    //头部宽的的动态变化
    _m.Widths=function (widths) {
           $('.header').css('width',widths);
         }
    //导航栏的生成
    _m.nav=function () {
         self.over();
         self.out();
       }

       //导航栏鼠标移入导航事件源的效果
      _m.over = function () {
          $('.header .nav ul li').unbind('mouseover').bind('mouseover',function () {
              var index=$(this).index();
              if($(this).find('dl dd').length==0){
                   return;
              }else{
                  $(this).find('dl').show();
              }

          })
      }
       //导航栏鼠标移开导航事件源的效果
       _m.out=function () {
           $('.header .nav ul li').unbind('mouseout').bind('mouseout',function () {
               $(this).find('dl').hide();

           })
       }
       //二级菜单点击效果
      _m.twoNavClick=function () {
          $('.header .nav ul li dl dd').unbind('click').bind('click',function () {
              var num= $(this).index();
              var dataId = $(this).attr('data-id');
              var parents=$(this).parent().parent();
              var index = parseInt( parents.attr('id'));
                   if(index!=0){
                       self.jump(index,num,dataId)
                   }
          })
      }
      //导航的进入二级页面的点击事件
       _m.navClick=function () {
           $('.header .nav ul li span').unbind('click').bind('click',function () {
                  var parents=$(this).parent();
                  var index = parseInt( parents.attr('id'));
                  if(parents.find('dd')){
                      var dataId = parents.find('dd').eq(0).attr('data-id');
                  }

                     if(index!=0) {
                         self.jump(index,0,dataId);
                      }else{
                         location.href = 'index.html';
                     }
                   })

       }
       //点击content部分MORE效果
       _m.moreClick=function () {
           $('.content dl dt span.rg').unbind('click').bind('click',function () {
               var index = parseInt( $(this).attr('data'));
               var dataId = $('.header .nav ul li').eq(index).find('dd').eq(0).attr('data-id');
                   self.jump(index,0,dataId)
           })
       }
       //从一级页面向二级页面跳转的效果
       _m.jump=function (indexs,nums,dataIds) {
           var data = {
               index: indexs,
               num: nums,
               dataId:dataIds
           }
           sessionStorage["index"] = JSON.stringify(data);
           location.href = 'page2.html';
       }
       //点击后台管理按钮进入后台管理页面
       _m.Backstage = function () {
           $('.header .user').unbind('click').bind('click',function () {
               location.href='http://fmc.breaksport.cn/SystemLogin';
           })
       }
       //查看文章详情
       _m.lookSearch = function () {
          $('#shouye dl dd li').unbind('click').bind('click',function () {
              var ids=$(this).attr('data-id');
              var indexs= $(this).attr('data');
              var data = {
                  index: indexs,
                  num: '',
                  dataId:ids
              }
              sessionStorage["index"] = JSON.stringify(data);
              sessionStorage["ArticleId"] = JSON.stringify(ids);
              location.href='page3.html';
          })

       }
    return _m;
})();
header.init();
