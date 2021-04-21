const request = require('superagent');
const fs = require('fs');
const path = require('path');
const fileName = path.resolve(__dirname, 'data.js');
fs.readFile(fileName, 'utf8', function(err, data) {
  if (err) {
    console.log("err", err);
    return false;
  }
  const res = JSON.parse(data);

  let list = res.list;
  let current = res.tel;

  let index = list.indexOf(current);
  if (++index < list.length) {
    current = list[index];
  } else {
    current = list[0];
  }
  if (list.indexOf(current) == -1) {
    current = list[0];
  }
  const obj = {
    tel: current,
    list: list
  }
  send(current);
  fs.writeFile(fileName, JSON.stringify(obj), 'utf8', function(err, data) {
    if (err) {
      console.log("err", err);
      return false;
    }
  })

});
function send(current) {
  const sendData = {
    msgtype: "text",
    text: {
      "content": "今天你值班哟!",
      "mentioned_mobile_list":[current]
    }
  }
  request
    .post('https://webhock')
    .set('Content-Type', 'application/json')
    .send(sendData)
    .end((err, res) => {
      console.log("res", res);
    })
}
