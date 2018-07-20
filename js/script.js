$(document).ready(function(){
    $('#userLoginModal').modal('show');
     var username;
    var socket = io.connect("http://localhost:3000");
    $("input[type=submit]").on('click', function(){
        username = $("input[type=text]").val();
        if (!username){
            alert("Bir kullanici adi girmelisiniz.");
            return; 
        } else {
            $('#userLoginModal').modal('hide');
        }
        socket.emit('userLogin',{ 
            'username' : username
        });
    });

    $("li").on('click', function(){
        var selectedNumber = $(this).attr('attr-id');
        socket.emit('makeEstimate',{ 
            'tahmin' : selectedNumber,
            'username' : username 
        });
        $('.numbers ul li').unbind('click');
        $(".numbers ul li").css("opacity", "0.1");
    });

    socket.on("estimate", function(data){ 
        $(".result ul").append("<li>"+ data.tahmin + "<p>" +data.username+  "</p></li>"); 
    });


    socket.on("appInfo", function(data){ 
       //  $(".teamMember ul").append("<li>"+ data.username + "</li>"); // aldığımız datayı(mesaj ve nicki) append ile #yazismalar divinin içerisine li olarak ekledik.
    });
}); 