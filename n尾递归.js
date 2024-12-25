
"use strict";
// function factorial(n, acc) {
// 	"use strict";
// 	if (n === 0) return acc;
// 	return factorial(n - 1, n + acc);
// }
// console.log(factorial(10000000, 1));
function tailFactorial(n, total) {
    "use strict";
    if (n === 1) return total;
    return tailFactorial(n - 1, n * total);
}

function factorial(n) {
    "use strict";
    return tailFactorial(n, 1);
}

factorial(10000000); // 120



// V8引擎的尾递归优化已经默认关闭了

// 目前所有瀏覽器只有 Safari 有支持 Tail Call Optimization，就連 node 因為是用 Chrome V8 也沒有支持 Tail Call Optimization