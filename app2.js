var request = require('request');
var async = require('async');
var http = require('http')

// 请求最近2分钟内发布数
// http://abj-cbmsg-1.yunba.io/render?target=elogic_all.elogic_appkey_stat.publish_packet_count.554b602627302bb315893223.one&format=json&from=-2minutes

// http://abj-cbmsg-1.yunba.io/render?target=summarize(elogic_all.elogic_appkey_stat.publish_packet_count.554b602627302bb315893223.one,'2minutes')&format=json&from=-2minutes
// 请求平均数
// http://abj-cbmsg-1.yunba.io/render?target=summarize(elogic_all.elogic_appkey_stat.publish_packet_count.554b602627302bb315893223.one,'2minutes','avg')&format=json&from=-4minutes
require('request').debug = false
var body = {
            title:'Restful AP',
            host_name:'abj-front-bbg20'
            }
var appkey = "554b602627302bb315893223";
var options={
    publish:'publish',
    connect:'connect',
    subscribe:'subscribe',
    connect:'connect'
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
    if (options == 'area') {
        for (var i = 0; i < oData.length; i++) {
            var tmp =Number(oData[i][0]).toFixed(0);
          
            chartData.push(tmp);
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
if (body.title == 'Restful API') {
    console.log('Restful API');
    async.auto({

        get_RestfulAPI_publish: function(callback){
            console.log('in get_RestfulAPI_publish_day');
            var data =[];
            var time  = '-1days';
            var chart = {};
            // async code to create a directory to store a file in
            // this is run at the same time as getting the data
                 request(
                    { method: 'GET'
                    ,headers:{'content-type': 'application/json'}
                    
                    , uri:'http://abj-cbmsg-1.yunba.io/render?target=summarize(elogic_all.elogic_appkey_stat.'+options.publish+'_packet_count.'+appkey+'.one,"1minutes","avg")&format=json&from='+time+''

                    }
                  , function (error, response, body) {
                    if (error) {
                       console.log(error) 
                    };
                   if (!error && response.statusCode == 200) {
                    //console.log(body) // Show the HTML for the Google homepage
                    console.log('::::-------------'+options.publish+'-----------------::::')
                    data =JSON.parse(body);
                    if (isEmptyArr(data)) {
                    console.log("arr not ok")
                    callback('get_host is empty , the appkey is not vip');
                    return 0;  
                    };
                    chart.type ='area';
                    chart.id =''+options.publish+'-minutes-area-1';
                    chart.target = '#'+options.publish+'-minutes-area-1';
                    chart.title = 'Restful API每分钟'+options.publish+'调用次数';
                    chart.subtitleBig = '拖拽方大';
                    chart.subtitleSmallsubt = '细节图';
                    chart.maxZoom = 60*60*1000 ;//一小时 x最小时间间隔
                    chart.yAxisTitle = '每分钟调用平均数(条)';
                    chart.name = ''+options.publish+'调用数';
                    chart.pointInterval = 10*60*1000 //10分钟,时间单位
                    chart.pointStart = data[0].datapoints[0][1];//开始时间
                    chartData =dataFormat(data,'area');
                    
                    chart.data=chartData;
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
                    
                    , uri:'http://abj-cbmsg-1.yunba.io/render?target=summarize(elogic_all.elogic_appkey_stat.'+options.connect+'_packet_count.'+appkey+'.one,"1minutes","sum")&format=json&from='+time+''

                    }
                  , function (error, response, body) {
                    if (error) {
                       console.log(error) 
                    };
                   if (!error && response.statusCode == 200) {
                    //console.log(body) // Show the HTML for the Google homepage
                    console.log('::::-------------'+options.connect+'-----------------::::')
                    data =JSON.parse(body);
                    if (isEmptyArr(data)) {
                    console.log("arr not ok")
                    callback('get_host is empty , the appkey is not vip');
                    return 0;  
                    };
                    chart.type ='area';
                    chart.id =''+options.connect+'-minutes-area-1';
                    chart.target = '#'+options.connect+'-minutes-area-1';
                    chart.title = 'Restful API每分钟'+options.connect+'调用次数';
                    chart.subtitleBig = '拖拽方大';
                    chart.subtitleSmallsubt = '细节图';
                    chart.maxZoom = 60*60*1000 ;//一小时 x最小时间间隔
                    chart.yAxisTitle = '每分钟调用平均数(条)';
                    chart.name = ''+options.connect+'调用数';
                    chart.pointInterval = 10*60*1000 //10分钟,时间单位
                    chart.pointStart = data[0].datapoints[0][1];//开始时间
                    chartData =dataFormat(data,'area');
                    
                    chart.data=chartData;
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
                    
                    , uri:'http://abj-cbmsg-1.yunba.io/render?target=summarize(elogic_all.elogic_appkey_stat.'+options.subscribe+'_packet_count.'+appkey+'.one,"1minutes","sum")&format=json&from='+time+''

                    }
                  , function (error, response, body) {
                    if (error) {
                       console.log(error) 
                    };
                   if (!error && response.statusCode == 200) {
                    //console.log(body) // Show the HTML for the Google homepage
                    console.log('::::-------------'+options.subscribe+'-----------------::::')
                    data =JSON.parse(body);
                    if (isEmptyArr(data)) {
                    console.log("arr not ok")
                    callback('get_host is empty , the appkey is not vip');
                    return 0;  
                    };
                    chart.type ='area';
                    chart.id =''+options.subscribe+'-minutes-area-1';
                    chart.target = '#'+options.subscribe+'-minutes-area-1';
                    chart.title = 'Restful API每分钟'+options.subscribe+'调用次数';
                    chart.subtitleBig = '拖拽方大';
                    chart.subtitleSmallsubt = '细节图';
                    chart.maxZoom = 60*60*1000 ;//一小时 x最小时间间隔
                    chart.yAxisTitle = '每分钟调用平均数(条)';
                    chart.name = ''+options.subscribe+'调用数';
                    chart.pointInterval = 10*60*1000 //10分钟,时间单位
                    chart.pointStart = data[0].datapoints[0][1];//开始时间
                    chartData =dataFormat(data,'area');
                    
                    chart.data=chartData;
                    callback(null, chart);
                   };

                    }
                  )

          
        },
        
        format_data: ['get_RestfulAPI_connect','get_RestfulAPI_subscribe','get_RestfulAPI_publish', function(callback, results){
            //console.log('in format_data', JSON.stringify(results));
            // once the file is written let's email a link to it...
            // results.write_file contains the filename returned by write_file.
           
            var resData ={};
            var msg = [];
            
            resData.code = '1';
            msg.push(results.get_RestfulAPI_connect);
            msg.push(results.get_RestfulAPI_subscribe);
            msg.push(results.get_RestfulAPI_publish);
            //restful api 数据
          

            resData.msg = msg;


            callback(null, resData);
        }]
    }, function(err, results) {
        console.log('err = ', err);
        console.log('results = ', results.format_data);
    });
}
else{
    console.log('host');
    async.auto({

    get_host_connections: function(callback, results){
        console.log('in get_host_connections', JSON.stringify(results));
        
        // once there is some data and the directory exists,
        // write the data to a file in the directory
        var time = '-1days';
        
        var host =body.host_name;
     
        var chart = {}
       
  
           
        request(
            { method: 'GET'
            ,headers:{'content-type': 'application/json'}
            
            , uri:"http://abj-cbmsg-1.yunba.io/render?target=summarize("+ host+".emqtt_stat.established_count, '60second','sum')&format=json&from="+time+""
            // ,body :JSON.stringify({"action":"query", "appkey":"5486910d52be1f7e1dd83461"})

            }
          , function (error, response, body) {
            if (error) {
               console.log(error);
               callback("get_host_connections not response all request", datalist);
            };
          
           if (!error && response.statusCode == 200) {
            //console.log(body) // Show the HTML for the Google homepage.
            
            var data =JSON.parse(body);
            if (isEmptyArr(data)) {
            console.log("err");
            callback("err host");
            };
                    chart.type ='area';
                    chart.id =''+options.connect+'-minutes-area-1';
                    chart.target = '#'+options.connect+'-minutes-area-1';
                    chart.title = host+'连接数';
                    chart.subtitleBig = '拖拽方大';
                    chart.subtitleSmallsubt = '细节图';
                    chart.maxZoom = 60*60*1000 ;//一小时 x最小时间间隔
                    chart.yAxisTitle = '每分钟连接数(条)';
                    chart.name = ''+host+'连接数';
                    chart.pointInterval = 10*60*1000 //10分钟,时间单位
                    chart.pointStart = data[0].datapoints[0][1];//开始时间
                    chartData =dataFormat(data,'area');
                    
                    chart.data=chartData;
                    callback(null, chart);


           };

            }
          )
      
    
     
    },
    format_data: ['get_host_connections', function(callback, results){
        //console.log('in format_data', JSON.stringify(results));
        // once the file is written let's email a link to it...
        // results.write_file contains the filename returned by write_file.
       
            var resData ={};
            var msg = [];
            
            resData.code = '1';
            msg.push(results.get_host_connections);
            
            //restful api 数据
          

            resData.msg = msg;


            callback(null, resData);

    }]
}, function(err, results) {
    console.log('err = ', err);
    console.log('results = ', results.format_data);
});
}

