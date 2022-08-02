$(document).ready(function(){
    // enter để kết nối
    $('#idConnect').keypress(function(e){
        var key = e.which;
        //console.log(key);
        if(key == 13){
            var IPDevice = $('#idConnect').val();
            console.log(IPDevice);
         $.ajax({
            url:'/gettelnetdevice/' + IPDevice,
            type: 'GET',
            success: function(res){
                      console.log(res);
                $('#outputCMD').val(res);
            },
            error: function(err) {},
         });
        }
    });
    // nút gửi lệnh
    $('#idcmd').click(function(){
        var cmdDevice = $('#idComment').val();
        // console.log(cmdDevice)
        $('#outputCMD').val(cmdDevice);
      
       });


});
