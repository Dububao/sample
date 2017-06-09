window.addEventListener("message", function (event) {
            if (event.source != window)
                return;
            if (event.data.from == 'cs') {
                console.log('页面接收到内容脚本信息：' + event.data.msg);
                switch (event.data.msg) {
                    case 'clearCacheOK':
                        document.getElementById('btn').disabled = false;
                        document.getElementById('msg').innerHTML = '缓存清除成功';
                        break;
                    default:
                }
            }
        });

        function test() {			
            document.getElementById('btn').disabled = true;
            document.getElementById('msg').innerHTML = '缓存清除中3。。。';
            console.log('页面发送消息：clearCache');
            window.postMessage({ from: 'page', msg: 'clearCache'}, '*');
        }
		
		
		
		window.onload = function () {
			document.getElementById('btn').onclick = test;
			$("#kaoqin").contents().find('span').css('background','#f36');  
			$("input").css('background','#f36');  

		}