
// const fs = require('fs');

// const file = fs.readFileSync('./jd版本.json', 'utf-8')
// // console.log(res);

// const arr = file.split('\n')
// // console.log(arr)
// var finalArr = arr.map(str => {
//     const innerArr = str.replace(/\s/g,' ').split(' ');
//     // console.log(innerArr, '????')
//     return {
//         ee: innerArr[0],
//         erp: innerArr[1],
//         client: innerArr[2],
//         version: innerArr[3]
//     }
// });
// fs.writeFileSync('./11', JSON.stringify(finalArr) )

const json = require('./jdVersion.json');
// console.log(json)
const pcList = json.filter(i => {
    const [v] = i.version.split('-');
    const arr1 = v.split('.');
    return i.client === 'pc' && arr1.length === 3
});
console.log(pcList.length)
function compareVersion(version, another) {
    if (!version || !another) {
        return false;
    }
    const [v] = version.split('-');
    const [v1] = another.split('-');
    const arr1 = v.split('.');
    const arr2 = v1.split('.');
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (Number(arr1[i]) !== Number(arr2[i])) {
            return Number(arr1[i]) >= Number(arr2[i]);
        }
    }
    return false;
}

const finl = pcList.filter(i => {
    // return compareVersion('3.2.31',i.version)
    return compareVersion(i.version, '3.2.30')
})

console.log(finl, finl.length)

// 1709    3.2.30 以下版本用户
// 183956  3.2.30 及以上版本用户
// 185665

// 13656