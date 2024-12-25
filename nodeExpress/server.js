const express = require('express');
const path = require('path');

const app = express();

// 处理默认路由，返回前端页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 处理 getAbTest 路由
app.get('/getAbTest', (req, res) => {
    // 设置 cookie，指定 domain 为 ab.com
    res.cookie('abTest', 'true', { domain: 'ab.com' });
    res.cookie('abTest11', 'true');
    res.send('Cookie set for ab.com');
});

// 设置跨域中间件
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});