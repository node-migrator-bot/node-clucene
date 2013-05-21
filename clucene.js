var clucene = require("./build/Release/clucene_bindings"); 

clucene.STORE_YES = 1;
clucene.STORE_NO = 2;
clucene.STORE_COMPRESS = 4;
clucene.INDEX_NO = 16;
clucene.INDEX_ANALYZED = 32;
clucene.INDEX_NOT_ANALYZED = 64;
clucene.INDEX_NONORMS = 128;
clucene.TERMVECTOR_NO = 256;
clucene.TERMVECTOR_YES = 512;
clucene.TERMVECTOR_WITH_POSITIONS = 512 | 1024;
clucene.TERMVECTOR_WITH_OFFSETS = 512 | 2048;
clucene.TERMVECTOR_WITH_POSITIONS_OFFSETS = (512 | 1024) | (512 | 2048);

exports.CLucene = clucene;