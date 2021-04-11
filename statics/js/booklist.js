$(window).load(function() {	
	'use strict';
  // 编辑
  $('.edit').on('click', function() {
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
        console.log("result", result);
        if (code == 0) {
          let $content = $('.pop-content-right', $this);
          console.log("$('.idNo', $content)", $('.idNo'))
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
    arr.forEach(v => {
      let nArr = v.split('=');
      sendData[nArr[0]] = nArr[1];
    });
    sendData.bookDate = new Date(sendData.bookDate);
    $.ajax({
      url: '/api/books/modifybook',
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
