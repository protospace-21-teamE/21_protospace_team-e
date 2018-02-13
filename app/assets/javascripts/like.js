$(function(){
  //likeボタンを押した場合
  $("#like_button").on("click", function(e){
    //デフォルトイベント、ラップによるイベントの2重発生の回避
    e.preventDefault();
    event.stopPropagation();

    //url,target, id, csrfトークンの取得
    var icon_svg = $(this)
    var user_id = $('.current_user_id').val();
    var prototype_id = $('.prototype_id').val();
    var csrf_token = $('meta[name=csrf-token]').attr('content');
    var like_id = $("#like_id").val();
    console.log(like_id);

    //flag(0:like, 1:unlike)によって分岐
    if( $("#like_flag").val() == 0 ){
      var url = location.href + "/likes"
      var type = "POST"
    } else {
      var url = location.href + "/likes/" + like_id
      var type = "DELETE"
    }

    //ajax通信を行う
    $.ajax({
      url: url,
      type: type,
      headers: {"X-CSRF-Token": csrf_token},
      dataType: 'json',
      processData: false,
      contentType: false
    })

    //通信後処理
    .done(function(data){

      if( $("#like_flag").val() == 0 ){
        //like(flag==0)の場合,ハートを赤に変える
        icon = icon_svg.find("path")
        icon.attr("fill", "red")
        //カウントを1つ増やす
        var likes_count = Number($("#likes_count").text())+1
        $("#likes_count").text(likes_count);
        //flagの処理
        $("#like_id").val(data.id);
        $("#like_flag").val(1)
      } else {
        //unlike(flag==1)の場合,ハートをグレーに変える
        icon = icon_svg.find("path")
        icon.attr("fill", "#D7D7D7")
        //カウントを1つ減らす
        var likes_count = Number($("#likes_count").text())-1
        $("#likes_count").text(likes_count)
                //flagの処理
        $("#like_flag").val(0)
      }
    })

    //通信失敗した場合エラーメッセージを出す
    .fail(function(){
      alert('error');
    })
  });
});




