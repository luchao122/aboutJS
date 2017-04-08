//数组乱序
if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };
}
//另一种乱序
var testArray=[1,2,3,4,5,6,7,8,9,10,22,33,55,77,88,99]; 
testArray.sort(function(){return Math.random()>0.5?-1:1;}); 

//搜索
var testArray=['df', 'rtr', 'wy', 'dafd', 'dfs', 'wefa', 'tyr', 'rty', 'rty', 'ryt', 'afds', 'wer', 'te']; 
testArray.sort(function(a,b){return a.indexOf('a')==-1?1:-1;});

function lazyArrayDeal(arr,process){
    var items=arr.cancat();
    do{
        var stime=+new Date();
        var todo=items.shift();
        process(todo);
    }while((+new Date()-stime)>50&&items.length)
    if(items.length){
        setTimeout(arguments.callee,25);
    }else{
        console.log(todo);
    }
}