const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const formidable = require('formidable');
const util = require('util');
const jade = require('jade');
const sd = require('silly-datetime');

let form = new formidable.IncomingForm();

http.createServer((req, res) => {
    console.log('我们正在监听：858端口！')
    let urlJson = url.parse(req.url, true);


    if (req.url.indexOf('/favcion.ico') > -1) {
        console.log('error')
        return;
    }
    if (urlJson.pathname == '/albom' && req.method.toLowerCase() == 'post') {
        console.log('come in')
        form.encoding = 'utf-8';
        form.uploadDir = './albom';
        form.parse(req, (err, fields, files) => {
            res.writeHead(200, { 'Content-type': 'text/html;charset=utf8' });
            let ttt = sd.format(new Date(), 'YYYYMMDDHHMMss');
            let ran = parseInt(Math.random() * 10000);
            let extname = path.extname(files.img.name);

            let oldPath = __dirname + '/' + files.img.path;

            let newPath = __dirname + '/albom/' + ttt + ran + extname;

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.log(err);
                    throw Error('改名失败！')
                };
                let data = {
                    name: 'wbiokr',
                    successed: true
                }
                let html = jade.renderFile('./return.jade', data);
                res.end(html)
            })



        })

        return;
    } else {
        console.log('else')
        fs.readFile('./practice.html', (err, files) => {
            // console.log()
            if (err) {
                console.log(err)
                throw Error('sorry');
                return;
            }
            // console.log(files)
            res.writeHead(200, { 'Content-type': 'text/html;charset=utf8' });
            res.end(files)
        })
    }

}).listen(858, '127.0.0.1');