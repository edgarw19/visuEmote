var indico = require('indico.io');
indico.apiKey = "f06822fe3481a25d07450c356edfb554";

var analyze = module.exports = {}; 

analyze.getSentiments = function(text, chunkSize, cb) {

    words = text.split(" "); // array of words 
    chunks = []; 
    var chunkNum = 0; 

    for (var i = 0; i < words.length; i++) {
        if (i % chunkSize == 0) { 
            chunks[chunkNum] = ""; 
            chunkNum++; 
        }
        chunks[ chunkNum - 1 ] += words[i] + " "; 
    }

    indico
        .batchSentiment(chunks)
        .then(function(res){
            result = []; 
            for (var i = 0; i < chunks.length; i++) {
                result[i] = {};
                result[i].text = chunks[i]; 
                result[i].sentiment = res[i];
            }
            cb(result); 
        })
        .catch(function(err){
            console.log("getSentiments error: ", err); 
        })
}
