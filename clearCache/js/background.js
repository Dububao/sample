//监听内容脚本发送的消息
chrome.runtime.onMessage.addListener(function (request, sender, response) {
    console.log('bg收到cs消息：' + request.msg);
    switch (request.msg) {
        case 'clearCache':
            var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7 * 52;
            var oneYearAgo = (new Date()).getTime() - millisecondsPerWeek;
            chrome.browsingData.remove({ "since": oneYearAgo }, {
                "appcache": true,
                "cache": true,
                "cookies": true,
                "downloads": true,
                "fileSystems": true,
                "formData": true,
                "history": true,
                "indexedDB": true,
                "localStorage": true,
                "serverBoundCertificates": true,
                "pluginData": true,
                "passwords": true,
                "webSQL": true
            }, function () {
                chrome.tabs.query({ active: true }, function (tab) {
                    chrome.tabs.sendMessage(tab[0].id, { msg: 'clearCacheOK', callback: request.callback }, null);
                });
            });
            break;
    }
});