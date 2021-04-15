const request = require('superagent');
const expect = require('chai').expect;

describe('接口测试', function() {
  it('编辑书籍接口', function(done){
    const sendData = {
      auth: "接口测试的作者",
      bookDate: "2021-04-15",
      name: "接口测试的书名",
    }
    request
      .post('http://localhost:8879/api/books/modifybook')
      .set('Content-Type','application/json')
      .send(sendData)
      .end(function(err, res){
        console.log("res", res.body);
        expect(res.body.code).to.be.equal(0);
        done();
      });
  });
});

describe('接口测试', () => {
  it('添加书籍接口', done => {
    const sendData = {
      auth: "接口测试的作者",
      bookDate: "2021-04-15",
      name: null,
    }
    request
      .post('http://localhost:8879/api/books/addbook')
      .set('Content-Type', 'application/json')
      .send(sendData)
      .end((err, res) => {
        console.log("res", res.body);
        expect(res.body.code).to.be.equal(0);
        done();
      })
  })
})