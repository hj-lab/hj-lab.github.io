var check_name = [],
    $test;

// 입력박스 클릭시 초기회
$(document).on('click', '#name', function() {
    $('#name').val('');
});

// 이름 추가
$(document).on('click', '#btn-add', function() {
    var name = $('#name').val(),
        content = '';

    if(check_name.includes(name)) {
        alert('이미 등록되어있습니다.');
    } else if(name == '') {
        alert('비어있습니다.');
    } else {
        content += '<button class="list-group-item list-group-item-action name" data-toggle="list" data-name="' + name + '">';
        content += name;
        content += '<a href="#" class="badge badge-danger badge-primary del">삭제</a>'
        content += '</button>'
        $('#id').append(content);
        check_name.push(name);
    }
});

// 이름 삭제
$(document).on('click', '.del', function(e) {
    e.stopPropagation();
    $(this).parents('button').remove();
});

// 이름 선택
$(document).on('click', '.name', function(e) {
    var name = $(this).attr('data-name');
    search_char(name);
});

// 캐릭터 찾기
function search_char(name) {
    var base = 'https://maplestory.nexon.com',
        flag = true;

    $.ajax({
        url: "https://maplestory.nexon.com/Ranking/World/Total?c=" + name,
        dataType: "html",
        success: function (data) {
            $(data).find('dt').each(function () {
                var $tmp = $(this)[0];

                // console.log($tmp.innerText);
                if ($tmp.innerText == name) {
                    flag = false;
                    address = $(this).find('a')[0].attributes[0].value;
                    // console.log(address);
                    var str1 = address.substring(0, address.indexOf('?')),
                        str2 = address.substr(address.indexOf('?'), address.length),
                        marge = str1 + '/Equipment' + str2;
                    // console.log(marge);
                    load_item(base + marge);
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

// 아이템 불러오기
function load_item(url) {
    $.ajax({
        url: url,
        dataType: 'html',
        success: function (data) {
            // var $op = $(data).find('ul.item_pot > li'); // 아이템 옵션
            // console.log($op);
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
                        content += '<li></li>';
                        continue;
                    }
                    // console.log($test[i - m].alt);
                    content += '<li><img src="' + $test[i - m].src + '" alt="' + $test[i - m].alt + '"></li>';
                } catch(e) {
                    console.log(e.name);
                    if(e.name === 'TypeError') {
                        console.log('권한이 없습니다.');
                    }
                    break;
                }
            }
            $('.item_pot').html(content);
        }, error: function () {
            console.log('failed');
        },
        timeout: 3000
    });
}