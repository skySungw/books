
// 解析excel文件并生成json的文件
var fs = require('fs');
var path = require('path');
var xlsx = require('node-xlsx');
var num = 8;
var sheets = xlsx.parse('./file/static/' + num + '.xlsx');//获取到所有sheets
var list = [];
sheets.forEach(function(sheet){
  var count = 0;
  for(var rowId in sheet['data']){
    if (count > 1) {
      // console.log(rowId);
      var row=sheet['data'][rowId];
      if (row.length > 0) {
        list.push({
          type: row[1],
          title: row[2],
          answer: row[3],
          content: [
            'A :' + row[9],
            'B :' + row[10],
            'C :' + row[11],
            'D :' + row[12],
            'E :' + row[13]
          ]
        });
      }
    }
    count++;
  }
});

fs.writeFile(path.resolve(__dirname, 'static', num + '.json'), JSON.stringify(list), function(err) {
  if (err) {
    return new Error(err);
  }
  console.log("ok");
})