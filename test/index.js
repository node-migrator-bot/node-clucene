var path = require('path');
var fs = require('fs');
var wrench = require('wrench');

var cl = require('../clucene').CLucene;
var clucene = new cl.Lucene();

var indexPath = './test.index';

exports['add new document'] = function (test) {
    if (fs.existsSync(indexPath)) {
        wrench.rmdirSyncRecursive(indexPath);
    }
    
    var doc = new cl.Document();
    var docId = '1';

    doc.addField('name', 'Eric Jennings', cl.STORE_YES|cl.INDEX_ANALYZED);
    doc.addField('_type', 'contact', cl.STORE_YES|cl.INDEX_NOT_ANALYZED);
    doc.addField('timestamp', '1293765885000', cl.STORE_YES|cl.INDEX_NOT_ANALYZED);

    clucene.addDocument(docId, doc, indexPath, function(err, indexTime) {
        test.equal(err, null);
        test.ok(is('Number', indexTime));
        clucene.closeWriter();
        test.done();
    });
};

exports['query newly-added document'] = function (test) {
    clucene.search(indexPath, '1', function(err, results, searchTime) {
        test.equal(err, null);
        test.ok(is('Array', results));
        test.ok(is('Number', searchTime));
        test.equal(results[0]._id, 1);
        test.equal(results[0].name, 'Eric Jennings');
        test.equal(results[0]._type, 'contact');
        test.equal(results[0].timestamp, '1293765885000');
        test.done();
    });
};

exports['update existing document'] = function (test) {
    var doc = new cl.Document(),
        docId = '1';

    doc.addField('name', 'Thomas Anderson', cl.STORE_YES|cl.INDEX_ANALYZED);
    doc.addField('timestamp', '129555555555555', cl.STORE_YES|cl.INDEX_NOT_ANALYZED);

    clucene.addDocument(docId, doc, indexPath, function(err, indexTime) {
        test.equal(err, null);
        test.ok(is('Number', indexTime));
        clucene.closeWriter();
        test.done();
    });
};

exports['query updated document'] = function (test) {
    clucene.search(indexPath, '1', function(err, results, searchTime) {
        test.equal(err, null);
        test.ok(is('Array', results));
        test.ok(is('Number', searchTime));
        test.equal(results[0]._id, 1);
        test.equal(results[0].name, 'Thomas Anderson');
        test.equal(results[0].timestamp, '129555555555555');
        test.done();
    });
};

exports['query by full field name'] = function (test) {
    clucene.search(indexPath, 'name:"Thomas"', function(err, results, searchTime) {
        test.equal(err, null);
        test.ok(is('Array', results));
        test.ok(is('Number', searchTime));
        test.equal(results[0]._id, 1);
        test.equal(results[0].name, 'Thomas Anderson');
        test.equal(results[0].timestamp, '129555555555555');
        test.done();
    });
};

exports['query by wildcard'] = function (test) {
    clucene.search(indexPath, 'name:Thom*', function(err, results, searchTime) {
        test.equal(err, null);
        test.ok(is('Array', results));
        test.ok(is('Number', searchTime));
        test.equal(results[0]._id, 1);
        test.equal(results[0].name, 'Thomas Anderson');
        test.equal(results[0].timestamp, '129555555555555');
        test.done();
    });
};

exports['delete document'] = function (test) {
    clucene.deleteDocument('1', indexPath, function(err, indexTime) {
        test.equal(err, null);
        test.ok(is('Number', indexTime));
        test.done();
    });
};

exports['add doc1 for type test'] = function (test) {
    var doc = new cl.Document();
    var docId = '10';

    doc.addField('name', 'Eric Jennings', cl.STORE_YES|cl.INDEX_ANALYZED);
    doc.addField('_type', 'contact', cl.STORE_YES|cl.INDEX_NOT_ANALYZED);
    doc.addField('timestamp', '1293765885000', cl.STORE_YES|cl.INDEX_NOT_ANALYZED);
    doc.addField('price', '1', cl.STORE_YES|cl.INDEX_NOT_ANALYZED);

    clucene.addDocument(docId, doc, indexPath, function(err, indexTime) {
        test.equal(err, null);
        test.ok(is('Number', indexTime));
        test.done();
    });
};

exports['add doc2 for type test'] = function (test) {
    var doc = new cl.Document();
    var docId = '11';

    doc.addField('name', 'Jessi Jennings', cl.STORE_YES|cl.INDEX_ANALYZED);
    doc.addField('_type', 'contact', cl.STORE_YES|cl.INDEX_NOT_ANALYZED);
    doc.addField('timestamp', '1293765885000', cl.STORE_YES|cl.INDEX_NOT_ANALYZED);
    doc.addField('price', '2', cl.STORE_YES|cl.INDEX_NOT_ANALYZED);

    clucene.addDocument(docId, doc, indexPath, function(err, indexTime) {
        test.equal(err, null);
        test.ok(is('Number', indexTime));
        clucene.closeWriter();
        test.done();
    });
};

exports['add doc3 for type test'] = function (test) {
    var doc = new cl.Document();
    var docId = '12';

    doc.addField('name', 'Max Mann', cl.STORE_YES|cl.INDEX_ANALYZED);
    doc.addField('_type', 'contact', cl.STORE_YES|cl.INDEX_NOT_ANALYZED);
    doc.addField('timestamp', '1293765885000', cl.STORE_YES|cl.INDEX_NOT_ANALYZED);
    doc.addField('price', '3', cl.STORE_YES|cl.INDEX_NOT_ANALYZED);

    clucene.addDocument(docId, doc, indexPath, function(err, indexTime) {
        test.equal(err, null);
        test.ok(is('Number', indexTime));
        clucene.closeWriter();
        test.done();
    });
};

exports['ensure 3 docs exist for type test'] = function (test) {  
    clucene.search(indexPath, '_type:"contact"', function(err, results, searchTime) {
        test.equal(err, null);
        test.ok(is('Array', results));
        test.ok(is('Number', searchTime));
        test.equal(results.length, 3);
        test.done();
    });
};

exports['query by range'] = function (test) {
    clucene.search(indexPath, 'price:[2 TO 3]', function(err, results, searchTime) {
        test.equal(err, null);
        test.ok(is('Array', results));
        test.ok(is('Number', searchTime));
        test.equal(results[0]._id, 11);
        test.equal(results[0].name, 'Jessi Jennings');
        test.equal(results[0].timestamp, '1293765885000');
        test.equal(results[0].price, 2);
        test.equal(results[1]._id, 12);
        test.equal(results[1].name, 'Max Mann');
        test.equal(results[1].timestamp, '1293765885000');
        test.equal(results[1].price, 3);
        test.done();
    });
};

exports['delete all docs of type'] = function (test) {        
    clucene.deleteDocumentsByType('contact', indexPath, function(err, indexTime) {
        test.equal(err, null);
        test.ok(is('Number', indexTime));
        test.done();
    });
};
    
exports['ensure deleted docs of type are all gone'] = function (test) {            
    clucene.search(indexPath, '_type:"contact"', function(err, results, searchTime) {
        test.equal(err, null);
        test.ok(is('Array', results));
        test.ok(is('Number', searchTime));
        test.equal(results.length, 0);
        test.done();
    });
};

exports['the index can be optimized'] = function(test) {
    clucene.optimize(indexPath, function(err) {
        test.equal(err, null);
        test.done();
    });
};

function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}