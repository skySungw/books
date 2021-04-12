$(window).load(function() {	
	'use strict';
  var flag = 'edit';
  $('.add-book').on('click', function() {
    flag = 'add';
    $('.pop-title').html('添加书籍');
    $('.idNo-hidden').val('');
    $('.idNo').html('');
    $('.book-name').val('');
    $('.book-auth').val('');
    $('.book-publish-date').val('');
    $('.book-status').html('');
    $('.pop-ok').val('添加书籍');
    $('.bgPop,.pop').show();
  })
  var date=new XNDatepicker($("#date"),{
    format:'YYYY-MM-DD',
    type:'date',//year/month/date/multiple/ week/datetime/datetimerange/ daterange/monthrange/yearrange
    multipleDates:[],//当为多选日期类型时的初始值
    startTime:'',
    // endTime:'2036-04-04',
    // minDate:'2019-04-04',
    maxDate:'',
    separator:' 到 ',
    showType:'modal',
    linkPanels:false,//面板联动
    showClear:true,//是否显示清除按钮
    autoConfirm:true,
    showShortKeys:true,
    autoFillDate:true,//自动变更element里面的值
  },function(data){
      console.log(data)
  },)
  // 编辑
  $('.edit').on('click', function() {
    flag = 'edit';
    $('.pop-ok').val('确认修改');
    const $this = $(this);
    const id = $this.attr('data-id');
    // 先查询单条信息
    $.ajax({
      url: '/api/books/querybook',
      type: 'POST',
      dataType: 'json',
      data: {
        id
      },
      success({code, result}) {
        if (code == 0) {
          $('.pop-title').html('编辑书籍');
          $('.idNo-hidden').val(result.id);
          $('.idNo').html(result.id);
          $('.book-name').val(result.bookName);
          $('.book-auth').val(result.bookAuth);
          $('.book-publish-date').val(result.bookPublishDate);
          $('.book-status').html(result.status);
          $('.bgPop,.pop').show();
        }
      },
      fail(err) {
        console.log(err);
      }
    });
  });
  // 确认编辑
  $('.pop-ok').on('click', function() {
    let submitDataStr = decodeURI($("form").serialize());
    const sendData = {};
    let arr = submitDataStr.split('&');
    let validFlag = true;
    arr.forEach(v => {
      let nArr = v.split('=');
      sendData[nArr[0]] = nArr[1];
      // if (!nArr[1]) {
      //   validFlag = false;
      //   return false;
      // }
    });
    if (!validFlag) {
      alert('请填写必填项!');
      return false;
    }
    sendData.bookDate = sendData.bookDate;
    const url = flag === 'add' ? '/api/books/addbook' : '/api/books/modifybook';
    $.ajax({
      url,
      type: 'POST',
      dataType: 'json',
      data: sendData,
      success({code, result}) {
        console.log("result", result);
        if (code == 0) {
          window.location.reload();
        }
      },
      fail(err) {
        console.log(err);
      }
    });
  });
  // 上下架
	$('.on-operate').on('click', function() {
    const $this = $(this);
    const id = $this.attr('data-id');
    const operate = $this.html();
    const type = operate == '上架' ? 0 : 1;
    $.ajax({
      url: '/api/books/operatebook',
      type: 'POST',
      dataType: 'json',
      data: {
        id,
        type
      },
      success({ code }) {
        if (code == 0) {
          window.location.reload();
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  });
   // 关闭编辑层
   $('.pop-close').click(function () {
    $('.bgPop,.pop').hide();
  });
});
