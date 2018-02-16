$(function(){
  function buildHTML(comment){
    var html =
    '<p>' +
      '<strong>' +
        comment.user_name +
        ' : ' +
      '</strong>' +
      comment.comment +
    '</p>'
    return html;
  }
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.comments').append(html)
      $('.textbox').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
  $('.delete_comment').on('click', function(e){
    e.preventDefault();
    event.stopPropagation();
    console.log($(this));
    comment_id = $(this).data("comment_id")
    var url = location.href + "/comments/" + comment_id
    var csrf_token = $('meta[name=csrf-token]').attr('content');
    $.ajax({
      url: url,
      type: 'DELETE',
      headers: {"X-CSRF-Token": csrf_token},
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data.id)
      var data_id = "#" + data.id + ""
      $(data_id).parent().remove()
    })
  })
});

