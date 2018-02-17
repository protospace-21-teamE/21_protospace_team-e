$(function(){
  var editedComment
  function buildHTML(comment){
    var html =
    '<div class="comment">' +
      '<strong>' +
        comment.user_name + ' : ' +
      '</strong>' +
      '<span class="comment-body">' +
      comment.comment +
      '</span>' +
      '<a class="edit-comment" data-user="' + comment.user_name + '" id="' + comment.id + '" href="'+ location.pathname +'/comments/' + comment.id +'" data-comment-id="' + comment.id + '">Edit</a>' +
      '<a class="delete-comment" id="' + comment.id + '" href="'+ location.pathname +'/comments/' + comment.id +'" data-comment-id="'+ comment.id +'" >Delete</a></div>'
    return html;
  }

  function editHTML(comment, name,commentId, csrfToken){
    var html ="<strong>" +
                name +
              "</strong>" +
              ":"+
              "<div class='edit-form-box'>" +
              "<form class='edit-form' enctype='multipart/form-data' action='" + location.pathname + "/comments/" + commentId +"' accept-charset='UTF-8' method='post'>" +
              "<input name='_method' type='hidden' value='patch'>" +
              "<input name='utf8' type='hidden' value='✓'>" +
              "<input type='hidden' name='authenticity_token' value='" + csrfToken + "'>" +
              "<input name='comment[comment]' placeholder='コメントする'' class='textbox' type='text' id='comment_comment' value='" + comment + "' >" +
              "<input type='submit' name='commit' value='SEND'></form></div>"
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
  $(document).on('click', '.delete-comment', function(e){
    e.preventDefault();
    event.stopPropagation();
    comment_id = $(this).data("comment-id")
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
      var data_id = "#" + data.id + ""
      $(data_id).parent().remove()
    })
  })

  $(document).on('click', '.edit-comment', function(e){
    e.preventDefault();
    event.stopPropagation();
    comment_id = $(this).data("comment-id");
    var comment = $(this).prev().text();
    var name = $(this).data("user");
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    editedComment = $(this).parent()
    $(this).parent().html(editHTML(comment, name, comment_id, csrfToken));
    // var url = location.href + "/comments/" + comment_id

    // $.ajax({
    //   url: url,
    //   type: 'PATCH',
    //   headers: {"X-CSRF-Token": csrf_token},
    //   dataType: 'json',
    //   processData: false,
    //   contentType: false
    // })
    // .done(function(data){
      // console.log(data.id)
    //   var data_id = "#" + data.id + ""
    //   $(data_id).parent().remove()
    // })
  })
  $(document).on('submit','.edit-form', function(e){
    e.preventDefault();
    event.stopPropagation();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "PATCH",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      editedComment.html(html)
    })
    .fail(function(){
      alert('error');
    })
  })


});

