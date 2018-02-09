// $(function(){
//   function buildHTML(comment){
//     var html = `<p>
//                   <strong>
//                     <a href=${comment.id}>${comment.user_name}</a>
//                     ：
//                   </strong>
//                   ${comment.comment}
//                 </p>`
//     return html;
//   }
//   $('#new_comment').on('submit', function(e){
//     e.preventDefault();
//     var formData = new FormData(this);
//     var url = $(this).attr('action')
//     $.ajax({
//       url: url,
//       type: "POST",
//       data: formData,
//       dataType: 'json',
//       processData: false,
//       contentType: false
//     })
//     .done(function(data){
//       var html = buildHTML(data);
//       $('.comments').append(html)
//       $('.textbox').val('')
//     })
//     .fail(function(){
//       alert('error');
//     })
//   })
// });
