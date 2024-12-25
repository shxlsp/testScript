const testTime = () => {
    const data = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
    };
    const map = new Map(Object.entries(data));
    const deleteKey = 'a';

    const time = process.hrtime()[1];
    map.delete(deleteKey);
    const timeEnd = process.hrtime()[1];

    const time2 = process.hrtime()[1];
    delete data[deleteKey];
    const timeEnd2 = process.hrtime()[1];
    console.log(timeEnd2-time2)
    return [timeEnd - time, timeEnd2 - time2]
}

const avera = (arr) => {
    return arr.reduce((a, b) => {
        if (!a) {
            return b;
        }
        return (a + b) / 2;
    }, 0)
}

const runTest = () => {
    const delTime = {
        'map': [],
        'obj': [],
    }

    for (let i = 0; i < 10; i++) {
        const [mapTime, objTime] = testTime();
        delTime.map.push(mapTime);
        delTime.obj.push(objTime);
    }
    console.log(delTime);

    const mapTime = avera(delTime.map);
    const objTime = avera(delTime.obj);
    console.log('mapTime: ',mapTime)
    console.log('objTime: ',objTime)
}

runTest()