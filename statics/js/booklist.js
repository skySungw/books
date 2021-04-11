$(window).load(function() {	
	'use strict';
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
      success(result) {
        console.log("result", result);
      },
      fail(err) {
        console.log(err);
      }
    })
    // 再编辑
  })
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
          alert('操作成功');
          window.location.reload();
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  })
  
});
