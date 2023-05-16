const { createClient } = require('@vercel/kv')
const express = require('express');

const app = express();

app.set('json spaces', 2)

app.get('/addList', async (req, res) => {
    const nums = req.query.nums;
    const time = await main(nums);
    const result = { message: `本次插入${nums}条数据，共计耗时${time}秒` };
    res.status(200).send(result)
})

app.get('/readList', async (req, res) => {

    const nums = req.query.nums;
    const time = await read(nums);
    const result = { message: `本次读取${nums}条数据，共计耗时${time}秒` };
    res.status(200).send(result)
})

async function main(nums) {
    return new Promise(async (res, rej) => {
        const users = createClient({
            url: 'https://related-monkey-32640.kv.vercel-storage.com',
            token: 'AX-AASQgNGI2MzY3YzQtNGU0NS00NDZlLTlhMTYtNzY5ZWQyODc5YTNiOGEwZTg4MWQ2M2NkNDQ3OWJhYjJjMTc4MTE3ODdhM2M='
        });
        const begin = Date.now();
        for (let i = 0; i < nums; i++) {
            const len = await users.llen('test');
            const result = await users.rpush('test', len + 1);
            console.log(result)
        }
        const end = Date.now();
        const costTime = (end - begin) / 1000;
        res(costTime)
    })
}

async function read(nums) {
    return new Promise(async (req, res) => {
        const users = createClient({
            url: 'https://related-monkey-32640.kv.vercel-storage.com',
            token: 'AX-AASQgNGI2MzY3YzQtNGU0NS00NDZlLTlhMTYtNzY5ZWQyODc5YTNiOGEwZTg4MWQ2M2NkNDQ3OWJhYjJjMTc4MTE3ODdhM2M='
        });
        const begin = Date.now();
        for (let i = 0; i < nums; i++) {
            const result = await users.lindex('test', i);
            console.log(result)
        }
        const end = Date.now();
        const costTime = (end - begin) / 1000;
        res(costTime)
    })
}


app.listen(3000, () => {
    console.log('fuck u')
})
