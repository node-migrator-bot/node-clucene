var path = require('path');
var fs = require('fs');
var wrench = require('wrench');
var async = require('async');

var cl = require('../clucene').CLucene;
var clucene = new cl.Lucene();

var indexPath = './heavy.index';

var testJson = JSON.parse(fs.readFileSync("./test/facebook.json"));

if (path.existsSync(indexPath)) {
    wrench.rmdirSyncRecursive(indexPath);
}

var ctr = 0;
async.whilst(
    function() {
        return ctr < 100000;
    },
    function(callback) {
        console.log("Adding " + ctr);
    	var doc = new cl.Document();
    	testJson.newField = ctr;
    	doc.addField("json", JSON.stringify(testJson), cl.STORE_YES|cl.INDEX_TOKENIZED);
    	doc.addField("baseId", String(ctr), cl.STORE_YES|cl.INDEX_UNTOKENIZED);

    	var docId = "id" + ctr;
    	clucene.addDocument(docId, doc, indexPath, function() { callback(); });
    	
        ctr++;
    },
    function(err) {
        setTimeout(function() { console.log("It's all done, go check."); }, 10000);
    }
);