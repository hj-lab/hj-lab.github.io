$(document).on('click', '#btn-calc', function() {
    $.ajax({
        url: "https://maplestory.nexon.com/Ranking/World/Total?c=%EC%95%84%EB%AF%B8%EC%B8%A0",
        dataType: "html",
        success: function (data) {
            console.log(data);
            // $('#content').html(data);
            $(data).find('아미츠').each(function() {
                console.log($(this));
            })
        },
        error: function(data) {
            console.log('failed');
        }
    });
});