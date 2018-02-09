$(function(){
  $("svg").on("click", function(e){
    icon = $(this).find("path")
    console.log(icon);
    icon.attr("fill", "red")
  });
});
