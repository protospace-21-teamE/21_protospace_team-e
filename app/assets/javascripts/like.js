$(function(){
  //likeボタンを押した場合
  $("#like_button").on("click", function(e){
    //デフォルトイベント、ラップによるイベントの2重発生の回避
    e.preventDefault();
    event.stopPropagation();

    //url,target, id, csrfトークンの取得
    var url = location.href + "/likes"
    var icon_svg = $(this)
    var user_id = $('.current_user_id').val();
    var prototype_id = $('.prototype_id').val();
    var csrf_token = $('meta[name=csrf-token]').attr('content');

    //ajax通信を行う
    $.ajax({
      url: url,
      type: "POST",
      headers: {"X-CSRF-Token": csrf_token},
      dataType: 'json',
      processData: false,
      contentType: false
    })

    //通信後処理
    .done(function(data){
      //ハートを赤に変える
      icon = icon_svg.find("path")
      icon.attr("fill", "red")

      //カウントを1つ増やす
      var likes_count = Number($("#likes_count").text())+1
      $("#likes_count").text(likes_count)
    })

    //通信失敗した場合エラーメッセージを出す
    .fail(function(){
      alert('error');
    })
  });

  //unlikeボタンを押した場合,ほぼlikeと同様
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
      icon = icon_svg.find("path")
      icon.attr("fill", "#D7D7D7")
      console.log($("#likes_count").text());
      var likes_count = Number($("#likes_count").text())-1
      $("#likes_count").text(likes_count)
    })
    .fail(function(){
      alert('error');
    })
  });
});




