import { IncomingMessage } from "node:http";
const http = require("http");
const md5 = require("md5");
const querystring = require("querystring");
const apiurl = "http://api.fanyi.baidu.com/api/trans/vip/translate?";

type FYOBJ = {
  from: string;
  to: string;
  trans_result: { src: string; dst: string }[];
  error_code?: string;
};
function translate(word: string) {
  const salt = Math.random();
  const appid = "20210326000743314";
  const m = "HmbKSJHcoXqAcN0MDGUq";
  const sign = md5(appid + word + salt + m);
  const isEnglish = /[a-zA-Z]/.test(word[0]);
  const from = isEnglish ? "en" : "zh";
  const to = isEnglish ? "zh" : "en";
  const option = {
    q: word,
    from,
    to,
    appid,
    salt,
    sign,
  };
  http.get(apiurl + querystring.stringify(option), (req: IncomingMessage) => {
    const chunks: Buffer[] = [];
    req.on("data", function (chunk) {
      chunks.push(chunk);
    });
    req.on("end", function () {
      const obj: FYOBJ = JSON.parse(Buffer.concat(chunks).toString());
      if (obj.error_code) return console.log(obj.error_code);
      obj.trans_result.forEach((e) => {
        console.log(e.dst);
      });
    });
  });
}
export { translate };
