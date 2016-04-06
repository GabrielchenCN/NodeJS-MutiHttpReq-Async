var request = require('request');
var async = require('async');
var http = require('http')

// 请求最近2分钟内发布数
// http://?target=.one&format=json&from=-2minutes

// http://?target=summarize(,'2minutes')&format=json&from=-2minutes
// 请求平均数
// http://,'2minutes','avg')&format=json&from=-4minutes
require('request').debug = false

var appkey = "";
var options={
    publish:'publish',
    connect:'connect',
    subscribe:'subscribe',
};

//请求主机

//请求连接数


function hostDataArr(data){
    var data =JSON.parse(data);
    var host = [];
    for(var p in data){
        //console.log(p) ;
        for (var i = 0; i < data[p].length; i++) {
            //console.log(data[p][i])
           for(var k in data[p][i]) 
           {
            
            host.push(k)
           }

        // };
      };
    };
   return host; 
}

function dataFormat(data,options){

    var chartData=[];
    var oData=data[0].datapoints;
    if(options == 'bar'){
    chartData.push(oData[0][0]);

     return chartData;
    };
    if (options == 'spline') {
        for (var i = 0; i < oData.length; i++) {
            var tmp =oData[i][0];
            oData[i][0]=oData[i][1];
            oData[i][1] = tmp;
            chartData.push(oData[i]);
        };
    

     return chartData;
    };
     
};

function isEmptyObject(obj){
    for(var n in obj){return false} 
    return true; 
};

function isEmptyArr(arr){
    if (arr.length === 0 ) { return true}
    return false;
}


//请求调用数（每分钟），一个图


async.auto({
    get_host: function(callback){
        console.log('in get_host');
        // async code to get some data
        var host = [];
        request(
            { method: 'POST'
            ,headers:{'content-type': 'application/json'}
            , uri: '/appkey_config/'

            ,body :JSON.stringify({"action":"query", "appkey":appkey})

            }
          , function (error, response, body) {
            if (error) {
               console.log(error) 
            };
           if (!error && response.statusCode == 200 ) {
            //console.log(body) // Show the HTML for the Google homepage.
            console.log(body)
            var data =JSON.parse(body);
            if (isEmptyObject(data)) {
                //console.log("get host not ok")
                callback('get_host is empty , the appkey is not vip');
                 
            };
            host = hostDataArr(body);
            callback(null, host);
             }
           
            }
          );
       
       
    },
    get_RestfulAPI_publish: function(callback){
        console.log('in get_RestfulAPI_publish');
        var data =[];
        var time  = '-60seconds';
        var chart = {};
        // async code to create a directory to store a file in
        // this is run at the same time as getting the data
             request(
                { method: 'GET'
                ,headers:{'content-type': 'application/json'}
                , uri: '?target=elogic_all.elogic_appkey_stat.'+options.publish+'_packet_count.'+appkey+'.one&format=json&from='+time+''


                }
              , function (error, response, body) {
                if (error) {
                   console.log(error) 
                };
               if (!error && response.statusCode == 200) {
                //console.log(body) // Show the HTML for the Google homepage
                console.log('::::-------------publish-----------------::::')
                data =JSON.parse(body);
                if (isEmptyArr(data)) {
                console.log("arr not ok")
                callback('get_host is empty , the appkey is not vip');
                return 0;  
                };
                chart.type ='bar';
                chart.id ='publish_bar-1';
                chartData =dataFormat(data,'bar');
                var params ={
                                "target": "#publish_bar-1",
                                "data": chartData,
                                "name": "publish数目",
                                "title": "publish数目",
                                "valueSuffix": "(条)"
                };
                chart.params=params
                callback(null, chart);
               };

                }
              ) 

      
    },
    get_RestfulAPI_connect: function(callback){
        console.log('in get_RestfulAPI_connect');
        var data =[];
        var time  = '-60seconds';
        var chart = {};
        // async code to create a directory to store a file in
        // this is run at the same time as getting the data
             request(
                { method: 'GET'
                ,headers:{'content-type': 'application/json'}
                , uri: '/render?target=elogic_all.elogic_appkey_stat.'+options.connect+'_packet_count.'+appkey+'.one&format=json&from='+time+''


                }
              , function (error, response, body) {
                if (error) {
                   console.log(error) 
                };
               if (!error && response.statusCode == 200) {
                //console.log(body) // Show the HTML for the Google homepage.
              console.log('::::-------------connect-----------------::::')

                data =JSON.parse(body);
                 if (isEmptyArr(data)) {
                console.log("arr not ok")
                callback('get_host is empty , the appkey is not vip');  
                 return 0;  
                };
                chart.type ='bar';
                chart.id ='connect_bar-1';
                chartData =dataFormat(data,'bar');
                var params ={
                                "target": "#connect_bar-1",
                                "data": chartData,
                                "name": "connect数目",
                                "title": "connect数目",
                                "valueSuffix": "(条)"
                };
                chart.params=params
                callback(null, chart);
               };

                }
              ) 

      
    },
    get_RestfulAPI_subscribe: function(callback){
        console.log('in get_RestfulAPI_subscribe');
        var data =[];
        var time  = '-60seconds';
        var chart = {};
        // async code to create a directory to store a file in
        // this is run at the same time as getting the data
             request(
                { method: 'GET'
                ,headers:{'content-type': 'application/json'}
                , uri: '/render?target=elogic_all.elogic_appkey_stat.'+options.subscribe+'_packet_count.'+appkey+'.one&format=json&from='+time+''


                }
              , function (error, response, body) {
                if (error) {
                   console.log(error) 
                };
               if (!error && response.statusCode == 200) {
                //console.log(body) // Show the HTML for the Google homepage.
                console.log('::::-------------subscribe-----------------::::')
                data =JSON.parse(body);
                 if (isEmptyArr(data)) {
                console.log("arr not ok")
                callback('get_host is empty , the appkey is not vip');  
                 return 0;  
                };
                chart.type ='bar';
                chart.id ='subscribe_bar-1';
                chartData =dataFormat(data,'bar');
                var params ={
                                "target": "#subscribe_bar-1",
                                "data": chartData,
                                "name": "subscribe数目",
                                "title": "subscribe数目",
                                "valueSuffix": "(条)"
                };
                chart.params=params
                callback(null, chart);
               };

                }
              ) 

      
    },
    get_host_connections: ['get_host',function(callback, results){
        console.log('in get_host_connections', JSON.stringify(results));
        if (isEmptyObject(results.get_host)) {
            console.log("err")
            callback("not vip");
        };
        // once there is some data and the directory exists,
        // write the data to a file in the directory
        var time = '-60s';
        
        var host =results.get_host;
        var cbcount =0;
        var datalist = [];
        var hostLength =host.length
        
        for (var i = 0; i < hostLength; i++) {
           
            request(
            { method: 'GET'
            ,headers:{'content-type': 'application/json'}
            , uri: "http://abj-cbmsg-1.yunba.io/render?target=summarize("+ host[i]+".emqtt_stat.established_count, '60second')&format=json&from="+time+""

            // ,body :JSON.stringify({"action":"query", "appkey":""})

            }
          , function (error, response, body) {
            if (error) {
               console.log(error);
               callback("get_host_connections not response all request", datalist);
            };
           if (!error && response.statusCode == 200) {
            //console.log(body) // Show the HTML for the Google homepage.
             cbcount=cbcount+1;
            var data =JSON.parse(body);
            var datalistObj = {};
            //console.log(host[i]);
            var str = data[0].target;
            var substr = str.match(/summarize\((.*)\.emqtt/);
            //console.log(substr[1])
            var chart = {};
            var chartArr =[];
            chart.type ='bar';
                chart.id ='host_bar-'+cbcount;
                chartData =dataFormat(data,'bar');
                var params ={
                                "target": "#host_bar-"+cbcount,
                                "data": chartData,
                                "name": "连接数目",
                                "title": "连接数目",
                                "valueSuffix": "(条)"
                };
                chart.params=params
                chartArr.push(chart);
                
            datalistObj.host_name = substr[1];
            
            datalistObj.charts = chartArr;
            datalist.push(datalistObj);
           
           //计数器发现http req 的cb全部返回。则返回数据
           if (cbcount==hostLength)
             {
                    //console.log("cb");
                    callback(null, datalist);

                }


           };

            }
          )
        };
    
     
    }],
    format_data: ['get_host_connections','get_RestfulAPI_connect','get_RestfulAPI_subscribe','get_RestfulAPI_publish', function(callback, results){
        //console.log('in format_data', JSON.stringify(results));
        // once the file is written let's email a link to it...
        // results.write_file contains the filename returned by write_file.
       
        var resData ={};
        var msg = [];
        var APIobj ={};
        var hostobj = {};
        var hostArr = [];
        var charts = []
        resData.code = '1';
        resData.appid = appkey ;
        //restful api 数据
        APIobj.title = 'Restful API';
        charts.push(results.get_RestfulAPI_publish);
        charts.push(results.get_RestfulAPI_connect);
        charts.push(results.get_RestfulAPI_subscribe);
        hostobj.charts = charts;
        hostobj.host_name ='Restful API';
        hostArr.push(hostobj);
        APIobj.host = hostArr;
        msg.push(APIobj);
        //主机连接数数据
        var hostConnectionsObj ={};
        
        
        
        hostConnectionsObj.title = '接入口';
        hostConnectionsObj.host =results.get_host_connections;
        msg.push(hostConnectionsObj);

        resData.msg = msg;


        callback(null, resData);
    }]
}, function(err, results) {
    console.log('err = ', err);
    console.log('results = ', results.format_data);
});
