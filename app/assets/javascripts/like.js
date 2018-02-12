$(function(){
  $("svg").on("click", function(e){
    e.preventDefault();
    // var prototype_id = 
    var url = location.href + "/likes"
    var icon_svg = $(this)
    // var formData = new FormData(this);
    console.log(url);
    $.ajax({
      url: url,
      type: "POST",
      // data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      icon = icon_svg.find("path")
      icon.attr("fill", "red")
    })
    .fail(function(){
      alert('error');
    })

  });
});




