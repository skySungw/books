$(window).load(function() {	
	'use strict';
	$('.on-operate').on('click', function() {
    const $this = $(this);
    const id = $this.attr('data-id');
    const operate = $this.html();
    const type = operate == '上架' ? 0 : 1;
    $.ajax({
      url: '/api/books/deletebook',
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
