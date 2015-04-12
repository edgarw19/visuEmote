var indico = require('indico.io');
indico.apiKey = "dd9693bd34b00cfeaee1c4fbf46580b6";

var sentiment = require('sentiment');

var analyze = module.exports = {}; 

analyze.getSentiments = function(text, chunkSize, cb) {
    // console.log("butts"); 

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

    result = []; 

    for (var i = 0; i < chunks.length; i++) {
        result[i] = {};
        result[i].text = chunks[i];
        result[i].sentiment = sentiment(chunks[i]).score; 
    }

    // indico.sentiment("I am happy", {'api_key' : 'dd9693bd34b00cfeaee1c4fbf46580b6'}, function(res) {
    //     console.log(res); 
    // })

    indico
        .batchSentiment(chunks)
        .then(function(res){
            result = []; 
            console.log(chunks.length); 
            for (var i = 0; i < chunks.length; i++) {
                result[i] = {};
                result[i].letter = i; 
                result[i].text = chunks[i]; 
                result[i].sentiment = res[i];
            }
            cb(result); 
        })
        .catch(function(err){
            console.log("getSentiments error: ", err); 
        })
}

// analyze.getSentiments = function(text, chunkSize, cb) {
//     // console.log("butts"); 

//     words = text.split(" "); // array of words 
//     chunks = []; 
//     var chunkNum = 0; 
    

//     for (var i = 0; i < words.length; i++) {
//         if (i % chunkSize == 0) { 
//             chunks[chunkNum] = ""; 
//             chunkNum++; 
//         }
//         chunks[ chunkNum - 1 ] += words[i] + " "; 
//     }

//     result = []; 

//     for (var i = 0; i < chunks.length; i++) {
//         result[i] = {};
//         result[i].letter = i;
//         result[i].text = chunks[i];
//         result[i].sentiment = sentiment(chunks[i]).score; 
//     }

//     cb(result); 

//     // return result;
// }

