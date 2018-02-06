$(function(){
  //fileを選択(valueが変わる)時に発火
  $("input[type='file']").change(function(e){
    //ファイルオブジェクトの作成
    reader = new FileReader();
    //読み込んだファイルの取得
    file = e.target.files[0];

    //ファイル読み込み終了時に発火
    reader.onload = (function(file) {
      return function(e){
        //imgタグのsrcを書き換え
        $("img").attr({
          src: e.target.result
        });
      };
    })(file);

    //ファイル読み込みの実行
    reader.readAsDataURL(file);
  });
});
