$(function(){
  $("#like_button").on("click", function(e){
    e.preventDefault();
    event.stopPropagation();
    var url = location.href + "/likes"
    var icon_svg = $(this)
    var user_id = $('.current_user_id').val();
    var prototype_id = $('.prototype_id').val();
    var csrf_token = $('meta[name=csrf-token]').attr('content');
    $.ajax({
      url: url,
      type: "POST",
      headers: {"X-CSRF-Token": csrf_token},
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      console.log(data);
      icon = icon_svg.find("path")
      icon.attr("fill", "red")
    })
    .fail(function(){
      alert('error');
    })
  });

  $("#unlike_button").on("click", function(e){
    e.preventDefault();
    event.stopPropagation();
    var prototype_id = $('.prototype_id').val();
    var url = $(this).attr("href")
    var icon_svg = $(this)
    var user_id = $('.current_user_id').val();
    var csrf_token = $('meta[name=csrf-token]').attr('content');
    $.ajax({
      url: url,
      type: "DELETE",
      headers: {"X-CSRF-Token": csrf_token},
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      console.log(data);
      icon = icon_svg.find("path")
      icon.attr("fill", "#D7D7D7")
    })
    .fail(function(){
      alert('error');
    })
  });
});




