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
            dataType: "json",
            success: function(res){
                      console.log(res);
                $('#outputCMD').val(res);
            },
            error: function(err) {},
         });
        }
    });
    // nút gửi lệnh
    $('#idComment').keypress(function(e){
        var key = e.which;
        if(key == 13){
            var cmdDevice = $('#idComment').val();
            console.log(cmdDevice);
            $('#outputCMD').html($('#idComment').val() + "\n");

        }

       });


});
