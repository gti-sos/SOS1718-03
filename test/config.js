exports.config = {
    
    seleniumAddress: 'http://localhost:8910',
    
   // specs: ['T00-APIGLOBAL.js','T03-loadDataPol.js','T04-AddPollution.js','T01-loadData.js','T02-AddGlobal.js'],
    specs: ['T00-APIGLOBAL.js','T01-loadData.js','T02-AddGlobal.js','T03-loadDataPol.js','T04-AddPollution.js'],
    
    capabilities: {
        'browserName' : 'phantomjs'
    },
    
    params: {
        host: 'localhost',
        port: '8080'
    }
    
}

exports.getAppUrl = function (){
    return "http://" + browser.params.host+":" +browser.params.port;
}