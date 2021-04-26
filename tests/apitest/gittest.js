const request = require('superagent');
const fs = require('fs');

function send(current) {
  const token = "5fbbcf474591d04bd0eec5d593e852";
  const branchName = "test";
  const url = 'https://git.int.ybm100.com/api/v4/projects/2386/ref/' + branchName + '/trigger/pipeline?token=' + token + '&variables["' + branchName + '"]=true';
  console.log('url', url);
  request
    .post(url)
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      console.log("res", res.body);
    })
}
send();