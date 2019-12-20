var urls = 'http://fmc.breaksport.cn';
/**
 * ajax封装
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * successfn 成功回调函数
 * errorfn 失败回调函数
 */
jQuery.axse = function(url, data, successfn, errorfn) {
    data = (data == null || data == "" || typeof(data) == "undefined") ? null: data;
    $.ajax({
        type: "post",
        data: data,
        url: url,
        jsonp: "jsonpcallback",
        dataType: "jsonp",
        success: function(e) {
            successfn(e);
        },
        error: function(e) {

            if(errorfn) {
                errorfn(e);
            }
            //				errorfn(e);
        },
        statusCode: {
            400: function() {
                alert('请求错误 : 请求参数错误');
            },
            404: function() {
                alert('请求错误 : 请求不存在');
            },
            500: function() {
                alert('请求错误 : 服务器错误');
            },
            503: function() {
                alert('网络繁忙')
            }
        }
    });
};
ChangeDateTime = function (cellval, flag) {
    if (cellval != null) {
        var date = new Date(parseInt(cellval.replace("/Date(", "").replace("/date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        if (flag == 1)
            return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute + ":" + second;
        else if (flag == 2)
            return date.getFullYear() + "-" + month + "-" + currentDate;
        else if (flag == 3)
            return date.getFullYear() + "." + month + "." + currentDate;
        else if (flag == 4)
            return date;
    }
    else return "";
};

