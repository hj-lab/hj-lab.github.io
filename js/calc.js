$(document).on('click', '#btn', function () {
    // history.replaceState(null, null, '#https://www.naver.com')

    $.ajax({
        url: "https://maplestory.nexon.com/Common/Resource/Item?p=ESiGOaxye8ZazwJEjUhfLFPWF%2fqbF1XfG8ljVaYDLdh5gAOAYkDMNiwntEZOS8u7GrHI0jfzHf1hJpLghIMUqm3v4pXPvJtK4Mh2jBYCDLaeSz5ERvTxeXFrjuzelM9%2bAv8d8XP4RdgnSZYVh7Qik9Vq6%2fmQJeWdWKxugGNz8w0d2E0owxBOW%2bPdgny0ZmsZ32swAR3FWaLgX5%2fjSJSoupr01vXZKABBYVOasgaGIdSvHFbnGJ7mVaz4yeHVCANx%2fwCZCWvXQt4HgTV%2f6HQu1mjH74wmTHChy4JbfocJS1ISSXTHuPD%2bUlHSPcloDcy49PLBxRURP%2bsxDVolL7%2bAjw%3d%3d",
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log('failed');
        }
    });
});

var check_nick = [];
$(document).on('click', '#btn-add', function() {
    var name = $('#name').val();
    if(check_nick.includes(name)) {
        alert('이미 등록되어있습니다.');
    } else if(name == '') {
        alert('비어있습니다.');
    } else {
        $('#id').append('<button href="#" class="list-group-item list-group-item-action nick" data-toggle="list">' + name + '</button>');
        check_nick.push(name);
    }
});

$(document).on('click', '.nick', function() {
    var nick = $(this).text();
    console.log(nick);
    one(nick);
});

$('#name').keyup(function (key) {
    if (key.keyCode == 13) {
        alert('a');
    }
});

var $test;

function one(nick) {
    var base = 'https://maplestory.nexon.com',
        flag = true;

    $.ajax({
        url: "https://maplestory.nexon.com/Ranking/World/Total?c=" + nick,
        dataType: "html",
        success: function (data) {
            $(data).find('dt').each(function () {
                var $tmp = $(this)[0];

                // console.log($tmp.innerText);
                if ($tmp.innerText == nick) {
                    flag = false;
                    address = $(this).find('a')[0].attributes[0].value;
                    // console.log(address);
                    var str1 = address.substring(0, address.indexOf('?')),
                        str2 = address.substr(address.indexOf('?'), address.length),
                        marge = str1 + '/Equipment' + str2;
                    // console.log(marge);
                    two(base + marge);
                }
            });
            if(flag) {
                alert('검색결과가 없습니다.');
            }
        }, error: function (data) {
            console.log('failed');
        },
        timeout: 3000
    });
}

$(document).on('click', '#name', function() {
    $('#name').val('');
})

$(document).on('click', '#btn-delete', function() {
    $('#테이').remove();
    // $(this).remove();
})

function two(url) {
    $.ajax({
        url: url,
        dataType: 'html',
        success: function (data) {
            var $op = $(data).find('ul.item_pot > li');
            console.log($op);
            // console.log($(data).find('div.char_img > div > img'));
            $('#dd').html('<img src="' + $(data).find('div.char_img > div > img')[0].src + '" alt="캐릭터">');
            $test = $(data).find('ul.item_pot > li > img')
            var content = '',
                m = 0;
            // console.log(test);
            for (var i = 0; i < 30; i++) {
                try {
                    if (i == 1 || i == 3 || i == 8 || i == 25 || i == 26) {
                        m++;
                        content += '<li></li>';
                        continue;
                    } else if($test[i - m].alt == '') {
                        // content += '<li></li>';
                        continue;
                    }
                    // console.log(test[i - m].alt);
                    // content += '<li><img src="' + $test[i - m].src + '" alt="' + $test[i - m].alt + '"></li>';
                    content += $op[i-m].outerHTML;
                } catch(e) {
                    console.log(e.name);
                    if(e.name === 'TypeError') {
                        console.log('권한이 없습니다.');
                    }
                    break;
                }
            }
            $('.item_pot').html(content);
        }, error: function (data) {
            console.log('two failed');
        }
    });
}