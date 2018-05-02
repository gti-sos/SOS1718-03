exports.config = {
    
    seleniumAddress: 'http://localhost:8910',
    
    specs: ['T01-loadData.js','T02-AddGlobal.js'],
    
    capabilities: {
        'browserName' : 'phantomjs'
    }
    
};