$(document).on('click', '#btn-calc', function() {
    $.ajax({
        url: "https://maplestory.nexon.com/Ranking/World/Total?c=%EC%95%84%EB%AF%B8%EC%B8%A0",
        dataType: "html",
        success: function (data) {
            // console.log(data);
            // $('#content').html(data);
            $(data).find('dt').each(function() {
                $tmp = $(this)[0].innerText
                console.log($tmp);
                if($tmp == '아미츠') {
                    console.log('a');
                }
            });
        },
        error: function(data) {
            console.log('failed');
        }
    });
});