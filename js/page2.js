var page2=(function () {
    var _m={};
    var self=_m;
    //出初始化
    _m.init=function () {
     self.leftData();
    }
    //左侧边栏初始化
    _m.leftData=function () {
        var data=JSON.parse(sessionStorage["index"]);
        var imgsrc=navDate[data.index];
        if(data){
            $('.page2 .left dl dd').remove();
            var params={
                ClassifyId:data.index
            };
            $.axse(urls + "/portClassify/ClassifyListSon",params, function(result) {
                  console.log(result);
                  $('.page2 .left dl dt span').text(result.ClassifyName);
                  $('.page2 .left dl dt img').attr('src',imgsrc);
                  self.loopleftData(result.ListClassifySon,data);
            },function () {

            })
        }
            self.rightInit(data.dataId);

    }
    //左侧边栏的二级目录的初始化
     _m.loopleftData = function (obj,data) {
        var dom='';
        for(var i=0;i<obj.length;i++){
            dom+='<dd data-id='+obj[i].ClassifyId+'>'+obj[i].ClassifyName+'</dd>';
        }
        $('.page2 .left dl').append(dom);

             $('.page2 .left dl dd').eq(data.num).addClass('active');


        self.leftClick(data);
    }

    //左侧边栏的点击事件
    _m.leftClick=function (data) {
       $('.page2 .left dl dd').unbind('click').bind('click',function () {
           $('#M-box1').empty();
           var dataIds=$(this).attr('data-id');
           var num=$(this).index();
           $('.page2 .left dl dd').removeClass('active');
           $(this).addClass('active');
           self.rightInit(dataIds);

           data.num=num-1;
           data.dataId=dataIds;
           sessionStorage["index"] = JSON.stringify(data);
           console.log(JSON.parse(sessionStorage["index"]));
       }) 
    }
    //右面侧边栏的初始化
    _m.rightInit=function (data) {
        var params={
               ClassifyId:data,
               PageNow:1,
               PageSize:10
             }
        $('#page2 .right ul').empty();
             self.ajax(params);

    }
    //对分页的的处理函数
      _m.pagination = function (totalDataS,PageCount) {
        $('#M-box1').pagination({
           totalData: totalDataS,
            showData: 10,
            coping: true,
            callback: function (index) {
                console.log(index.getCurrent());
               var data= JSON.parse(sessionStorage["index"]).dataId;
               var params={
                    ClassifyId:data,
                    PageNow:index.getCurrent(),
                    PageSize:10
                }
                $('#page2 .right ul').empty();
                self.ajax(params);
            }
           });
      }
    //右侧边栏的点击事件
    _m.rightClick=function () {
       
    }
    //ajax
    _m.ajax=function (params) {
        $.axse(urls + "/portArticle/ArticlePageList",params, function(result) {
            var DataList= JSON.parse(result.DataList);
            var totalDataS= result.DataCount;
            var PageCount=result.PageCount;
            if(DataList.length!=0){
                var dataHtml='';
                for(var i=0;i<DataList.length;i++){
                    dataHtml+= '<li class="clear" style="padding-left: 8px" onclick="page2.jump($(this))" data-id='+DataList[i].ArticleId+'><i></i><p class="lf">'+DataList[i].ArticleTitle+'</p><span class="rg">'+ChangeDateTime(DataList[i].ArticleTime,2)+'</span></li>';
                }
                $('#page2 .right ul').append(dataHtml);
            }else{
                var dataHtml = '<li class="clear" style="padding-left: 8px"><p>暂无数据</p></li>';
                $('#page2 .right ul').append(dataHtml);
            }
            if(totalDataS>10){
                if($('#M-box1 a').length>0){
                    return;
                }else{
                    self.pagination(totalDataS,PageCount)
                }



            }
    },function () {

    })
    }
    //分页插件的处理
    _m.paging=function () {
        
    }
    //跳转查看详情
    _m.jump=function (that) {
        var dataid=that.attr('data-id');
        sessionStorage["ArticleId"] = JSON.stringify(dataid);
       location.href='page3.html';

    }
    return _m;
})()
page2.init();
























