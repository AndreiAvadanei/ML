/* Training Class for 1 feature datasets - gradient descent for linear regression
   B = theta
*/ 

var fs            = require('fs')
	_             = require('underscore'),
	math          = require('mathjs'),
	sleep         = require('sleep'),
	file_features = 'features.txt',
	file_labels  = 'labels.txt',
	X = [],
	Y = [];

function init(tB,tA,callback) {
	fs.readFile(file_features, 'utf8', function(err, data) {
	  if (err) throw err;

	 /* load features - X */
	  X = _.map(data.split("\n"),function (value) {
	  	$ret =  value.split(' ');
	  	_.map($ret, function(v) {
	  		return parseInt(v);
	  	});
	  	return $ret;
	  });
	  /* load labels - Y */
	  fs.readFile(file_labels, 'utf8', function(err, data) {
	    if (err) throw err;
	  	Y = _.map(data.split("\n"),function(v) {
	  		return parseInt(v);
	  	});
	  	callback(tB,tA,2500); 
	   });
	});
}


function H(X,B) {
	return B[0] + B[1] * X[0];
}
  
function score(B) {
        var score = 0;
        for(i=0;i<X.length;i++) {
            score += math.pow(H(X[i],B) - Y[0], 2);
        }

        return score;
}  

function deriv(B) {
    var sum0 = sum1 = 0;

    for(i=0;i<X.length;i++) {
        sum0 += H(X[i],B) - Y[0];
    	sum1 += (H(X[i],B) - Y[0]) * X[i][0];
    }
        
    out0 = 1/X.length * sum0;
    out1 = 1/X.length * sum1;
        
    return [out0,out1];
}

function G(B,A) {

    var _deriv = deriv(B);
	var _score = score(B);

    B[0] = B[0] - (A * _deriv[0]);
    B[1] = B[1] - (A * _deriv[1]);
        
        // Test our score
    if(_score < score(B)) {
    	return false;
	}
    
    console.log('Score: ' + _score + " " + score(B) + " " + B);
    return B;
}

/* Train function */
function train(Bs,A, iterations) {
	B = Bs;
	steps = 0;
	console.log('Start training: ' + B + ' and ' + A);
	do {
		steps++;
		lB = B;
		B  = G(lB,A);

	} while(B != false && steps < iterations);
	console.log('End training: ' + lB + ' ' + score(lB) + "\r\nPrediction" + H([200],lB));

}

var tB = [0,0],tA=0.01;
init(tB,tA,train);
//old cost 32.072733877455654
//new cost 4.691301354743097