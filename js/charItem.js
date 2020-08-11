var check_name = [];

$(document).ajaxStart(function() {
    console.log('st');
    
});

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
    var $element = $(this).parents('button');

    e.stopPropagation();
    if(confirm($element.attr('data-name') + '를 삭제하시겠습니까?')) {
        const idx = check_name.indexOf($element.attr('data-name'));
        check_name.splice(idx, 1);
        $element.remove();
    }
});

// 이름 선택
$(document).on('click', '.name', function(e) {
    var name = $(this).attr('data-name');

    searchChar(name);
});

// 캐릭터 찾기
function searchChar(name) {
    var base = 'https://maplestory.nexon.com',
        noSearch = true;

    $.ajax({
        url: "https://maplestory.nexon.com/Ranking/World/Total?c=" + name,
        dataType: "html",
        success: function (data) {
            $(data).find('dt').each(function () {
                var $tmp = $(this)[0];

                // console.log($tmp.innerText);
                if ($tmp.innerText == name) {
                    noSearch = false;
                    address = $(this).find('a')[0].attributes[0].value;
                    // console.log(address);
                    var str1 = address.substring(0, address.indexOf('?')),
                        str2 = address.substr(address.indexOf('?'), address.length),
                        marge = str1 + '/Equipment' + str2;
                    // console.log(marge);
                    loadItem(base + marge);
                }
            });
            if(noSearch) {
                alert('검색결과가 없습니다.');
            }
        }, error: function (data) {
            console.log('failed');
        },
        timeout: 3000
    });
}

// 아이템 불러오기
function loadItem(url) {
    $.ajax({
        url: url,
        dataType: 'html',
        success: function (data) {
            var $element = $(data).find('ul.item_pot > li > img'), //$(data).find('ul.item_pot > li'); // 아이템 옵션
                content = '',
                syncCnt = 0;

            $('#avatar').html('<img src="' + $(data).find('div.char_img > div > img')[0].src + '" alt="캐릭터">'); // 캐릭터 이미지
            for (var i = 0; i < 30; i++) {
                try {
                    if (i == 1 || i == 3 || i == 8 || i == 25 || i == 26) {
                        syncCnt++;
                        content += '<li></li>';
                        continue;
                    } else if($element[i - syncCnt].alt == '') {
                        content += '<li></li>';
                        continue;
                    }
                    // console.log($element[i - syncCnt].alt); //아이템 명
                    content += '<li><img src="' + $element[i - syncCnt].src + '" alt="' + $element[i - syncCnt].alt + '"></li>';
                } catch(e) {
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