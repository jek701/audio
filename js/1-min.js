var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iPad: function () {
        //return false;
        return navigator.platform.match(/iPad/i);
    },
    iPhone: function () {
        //return navigator.platform.match(/iPad/i);
        return navigator.platform.match(/MacIntel|iPhone/i) && (navigator.maxTouchPoints ? navigator.maxTouchPoints : 0 > 0);
    },
    iPadPhone: function () {
        //return navigator.platform.match(/iPad/i);
        return navigator.platform.match(/MacIntel|iPhone/i) && (navigator.maxTouchPoints ? navigator.maxTouchPoints : 0 > 0) || navigator.platform.match(/iPad/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    IE: function () {
        return navigator.userAgent.toUpperCase().indexOf("TRIDENT/") != -1 || navigator.userAgent.toUpperCase().indexOf("MSIE") != -1;
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iPad() || isMobile.iPhone() || isMobile.Opera() || isMobile.Windows());
    }
};

var popUpCon = document.getElementById('pop-up-container'), popUpBg = document.getElementById('pop-up-bg'), body = document.querySelector('body');

function popUpActivate() {
	console.log('start');
	popUpCon.classList.add('active'),
	popUpBg.classList.add('active');
	body.style.overflow = "hidden";
	console.log('finish');
}



var who_full = {};
var mobil_platform = 0, mobil_screen = { innerWidth: window.innerWidth, innerHeight: window.innerHeight }
    , mobil_first_touch = 0;
if (isMobile.any()) {
    mobil_platform = 1;
    //if (isMobile.iPadPhone()) {
    //    var meta = document.querySelector('[name="viewport"]');
    //    if (!meta) document.head.innerHTML += '<meta name="viewport" />';
    //}
}
var asksoft_event = {
    mousedown: mobil_platform ? 'touchstart' : 'mousedown'
    , mouseup: mobil_platform ? 'touchend' : 'mouseup'
    , mousemove: mobil_platform ? 'touchmove' : 'mousemove'
    , click: mobil_platform ? 'touchend' : 'click'
}


function body_resize() {
	if (document.body.offsetWidth > 300) {
		//document.getElementById('xx').innerHTML = document.body.offsetWidth;
		var sz = (document.body.offsetWidth > 1200 ? 10 : (document.body.offsetWidth / 1000 * 27)).toFixed(4); // 26.5
		document.body.setAttribute('sz', sz);
		document.body.style.fontSize = sz + 'px';
		//console.log('width: ' + document.body.offsetWidth + '\tfont: ' + document.body.style.fontSize);
	}
}

var arr_button = [];
var str_button = '<div sid="{SID}" class="button-click">'
	+ '<div name="b-1" class="block l-30 ln-20"><span class="f-17">{NAME}</span></div>'
	+ '<div name="b-2" class="block l-30 ln-18"><span class="f-14" style="white-space: normal;">{TEXT}</span></div>'
	+ '<div name="b-3" class="block l-30 ln-18 f-bold"><span class="f-14" style="white-space: normal;">Консультация будет проходить в WhatsApp - это <u>анонимно и безопасно,</u> никаких дополнительных приложений устанавливать не надо.<br /><br />Ответим сразу!</div>'
	+ '<div name="b-4" e-name="ws" class="b-click"><img name="b-ws-white-text" class="ws-pic" src="img/ws-white-text.svg" /><span class="f-16">Написать в WhatsApp</span></div>'
	+ '<div name="b-5" class="b-img" style="{IMG}"></div>'
	+ '</div>';
function site_loading() {
	var el = document.querySelector('.what-u-feel');
	var str_html = '<div e-name="mouse-check" mouse-check="{I}" class="what-u-el" style="background: {BACK};">'
		+ '<div name="b-1" class="mouse-check">'
		+ '<div name="b-11" class="block l-30 ln-20"><span class="f-17 u">{TEXT}</span></div>'
		+ '</div>'
		+ '</div>';
	var str_el = 'ДЕПРЕССИЯ:#FFEC00:Во время депрессии очень часто ничего не хочется делать, отсутствует интерес ко всему, и ничто не приносит удовольствие.<br /><br />Вы узнаете, как можно жить полной жизнью с помощью нашей психологической программы по устранению депрессии.;'
		+ 'проблемы в отношениях:#FFE00E:Ссоры, недовольство партнером,<br />постоянная критика, агрессия, ревность<br />могут свидетельствовать о проблемах в<br />отношениях.<br /><br />Решить их и достичь гармонии в паре<br />можно с помощью нашей<br />психологической программы.;'
		+ 'непонимание:#FFD41D:Часто кажется, что близкие и окружающие<br />совершенно вас не понимают? Постоянно<br />возникают конфликты?<br /><br />Попробуйте нашу психологическую<br />программу, чтобы найти причины<br />недопониманий и повысить качество<br />жизни.;'
		+ 'одиночество:#FFCB11:Одинокий человек даже среди людей<br />может считать себя ненужным, покинутым,<br />несчастным.<br /><br />Изменить свою жизнь, сделать ее<br />счастливее и избавиться от одиночества<br />можно с помощью специальной<br />психологической программы.;'
		+ 'разочарование:#FFBC3A:Бывает так, что мечты не сбываются, а<br />представления о людях на деле<br />оказываются ложными. И наступает<br />разочарование.<br /><br />Избавиться от этого чувства, взглянуть на<br />жизнь по-новому поможет<br />индивидуальная психологическая<br />программа.;'
		+ 'больная привязанность:#ffb048:При больной привязанности<br />представления о жизни без<br />определенного человека вызывают<br />сильный страх и боль.<br /><br />Решить эту проблему, стать независимым<br />можно с помощью психологической<br />программы, которая разрабатывается<br />индивидуально.;'
		+ 'страх:#ffa457:Страх может изматывать человека<br />морально и физически, лишать его<br />перспектив, вызывать непонимание со<br />стороны близких.<br /><br />Избавиться от страха и обрести<br />уверенность в себе можно с помощью<br />нашей психологической программы.;'
		+ 'тревога:#ff9865:Неопределенность может вызывать у<br />человека тревожные мысли, заставлять<br />беспокоиться по пустякам. Иногда<br />повышенная тревожность возникает и без<br />причин.<br /><br />Узнайте, как избавиться от нее с помощью<br />нашей психологической программы.;'
		+ 'сложности в семье:#ff8c74:Непонимание со стороны близких, частые<br />конфликты, отсутствие тепла и уважения -<br />семейные проблемы, которые нужно<br />решать незамедлительно.<br /><br />Сделать это можно с помощью нашей<br />психологической программы.;'
		+ 'апатия:#ff866a:При апатии человек ощущает<br />безразличие, снижается интерес к<br />общению и прежним увлечениям,<br />отсутствуют стремления и эмоции.<br /><br />Узнайте, как вернуть вкус к жизни с<br />помощью нашей психологической<br />программы.;'
		+ 'нервы:#ff815c:Бывает так, что нервы напрягаются до<br />предела, а любая мелочь выводит из<br />состояния равновесия.<br />Из-за этого появляются проблемы на<br />работе и в семье.<br /><br />Узнайте, как стать спокойнее с помощью<br />индивидуальной психологической<br />программы.;'
		+ 'отсутствие мотивации:#ff7c4d:Низкая мотивация или ее полное<br />отсутствие мешают достигать<br />поставленных целей и улучшать качество<br />жизни.<br /><br />Узнай, как побудить себя к активным<br />действиям с помощью нашей<br />психологической программы.;'
		+ 'нарушение сна:#ff773f:При нарушениях сна человек чувствует<br />себя разбитым и уставшим, у него<br />снижается концентрация, появляется<br />раздражительность.<br /><br />Индивидуальная психологическая<br />программа поможет наладить сон и<br />восстановиться.;'
		+ 'агрессия:#ff7231:Из-за агрессии человек может срываться<br />на своих близких, а затем испытывать<br />чувство вины.<br /><br />Справиться с проблемой поможет<br />психологическая программа,<br />разработанная специально для вас.;'
		+ 'личная жизнь:#ff6d22:Проблемы в личной жизни приводят к<br />снижению самооценки, плохому<br />настроению и разочарованиям.<br /><br />Решить их и построить крепкие<br />отношения можно с помощью нашей<br />психологической программы.;'
		+ 'усталость:#ff6914:Из-за усталости порой все валится из рук,<br />ощущается внутреннее опустошение,<br />ухудшается память и сон. Нет сил вставать<br />по утрам и общаться с окружающими.<br /><br />Вернуть жизненную энергию поможет<br />наша психологическая программа.;'
		+ 'неуверенность в себе:#ff6406:Неуверенность в себе порождает в<br />человеке ощущение ненужности,<br />неполноценности. Он не верит в свои<br />возможности, отказывается от перспектив.<br /><br />Повысить самооценку поможет<br />специальная психологическая программа.;'
		+ 'потеря смысла жизни:#fd6006:Потеря смысла жизни может привести к<br />апатии, депрессии или отчаянию.<br /><br />Найти этот самый смысл заново поможет<br />индивидуальная психологическая<br />программа.;'
		+ 'конфликты на работе:#fb5e0d:Конфликты на работе приводят к<br />напряжению, неудовлетворенности своей<br />деятельностью и жизнью в целом.<br /><br />Решить их без особых потерь поможет<br />психологическая программа, которая<br />разрабатывается под каждого<br />индивидуально.;'
		+ 'лишний вес:#f85b15:Из-за лишнего веса страдает самооценка,<br />появляются проблемы в личной жизни,<br />возникают различные заболевания.<br />Сегодня можно похудеть и без строгих<br />диет.<br /><br />Просто попробуйте специальную<br />психологическую программу.;'
		+ 'трудности в общении:#f5591c:Трудности в общении мешают<br />устанавливать социальные связи и<br />строить карьеру.<br /><br />Избавиться от них, стать<br />коммуникабельным и уверенным в себе<br />можно с помощью нашей<br />психологической программы.;'
		+ 'злость:#f25724:Если сдерживать злость - она вредит<br />здоровью. Если выражать ее - возникают<br />конфликты с окружающими.<br /><br />Справиться с этим негативным чувством<br />без последствий для организма и<br />отношений поможет индивидуальная<br />психологическая программа.;'
		+ 'принятие себя:#f0542b:Проблемы с принятием себя ведут к<br />неудовлетворенностью жизнью,<br />снижению ее качества, комплексам,<br />сложностям в отношениях.<br /><br />Научиться принимать себя, достичь<br />внутренней гармонии поможет наша<br />психологическая программа.;'
		+ 'абьюз:#ed5233:Абьюз приводит к нарушениям<br />физического и психического состояния.<br />Жертвы чувствуют страх и отчаяние, но не<br />могут выйти из токсичных отношений.<br /><br />Узнайте, как с этим справиться  с<br />помощью специальной психологической<br />программы.;'
		+ 'стресс:#ea4f3a:Из-за частого стресса человек теряет<br />энергию, поэтому у него снижается<br />работоспособность и концентрация,<br />появляются рассеянность и чрезмерная<br />усталость.<br /><br />Узнайте, как бороться со стрессом с<br />помощью нашей психологической<br />программы.;'
		+ 'токсичность:#db4d47:После общения с токсичными людьми<br />обычно портится настроение, появляется<br />усталость и раздражительность.<br /><br />Узнайте, как правильно<br />взаимодействовать с подобными<br />личностями. Используйте нашу<br />психологическую программу.;'
		+ 'самореализация:#be4b58:Сложности с самореализацией влияют на<br />самооценку и уровень удовлетворенности<br />жизнью.<br /><br />С помощью специальной<br />психологической программы вы узнаете,<br />как найти себя.;'
		+ 'опустошенность:#a24969:Опустошенный человек не чувствует<br />внутренних сил, с трудом встает по утрам,<br />не ощущает интереса к общению и<br />повседневным делам.<br /><br />Справиться с этой проблемой поможет<br />персональная психологическая<br />программа.;'
		+ 'эмоции:#85487a:Излишние эмоции или полное их<br />отсутствие приводят к сложностям в<br />общении и на работе, снижают качество<br />жизни.<br /><br />Узнайте, как решить эти проблемы с<br />помощью индивидуальной<br />психологической программы.;'
		+ 'поиск себя:#69468b:Поиск себя может сопровождать чувство<br />неопределенности, страхи,<br />неуверенность, проблемы с самооценкой.<br /><br />Узнайте, как быстро самореализоваться с<br />помощью нашей психологической<br />программы.;'
		+ 'закрытость:#4c449c:Излишние эмоции или полное их<br />отсутствие приводят к сложностям в<br />общении и на работе, снижают качество<br />жизни.<br /><br />Узнайте, как решить эти проблемы с<br />помощью индивидуальной<br />психологической программы.;'
		+ 'лидерство:#3042ad:Лидеры чувствуют себя важными,<br />нужными и значимыми. Они ощущают<br />удовольствие от своей деятельности и<br />каждой новой победы.<br /><br />Узнайте, как развить лидерские качества и<br />проявить себя с помощью специальной<br />психологической программы.;'
		+ 'напряжение:#1340bf:Излишняя напряженность приводит к<br />плохому настроению, тревожности,<br />усталости, снижает концентрацию,<br />ухудшает память.<br /><br />Узнайте, как обрести спокойствие и<br />научиться расслабляться с помощью<br />нашей психологической программы.;'
		+ 'алкоголь:#0044ca:Алкогольная зависимость ведет к<br />заболеваниям, проблемам в семье и на<br />работе. Личность человека постепенно<br />начинает разрушаться.<br /><br />Узнайте, как навсегда победить<br />зависимость с помощью индивидуальной<br />психологической программы.;'
		+ 'расставание:#0052ca:Расставание часто вызывает грусть,<br />проблемы с самооценкой, сильную боль,<br />разочарование и сожаление.<br /><br />Справиться с негативными эмоциями и<br />подготовиться к новым отношениям<br />поможет специальная психологическая<br />программа.;'
		+ 'любовь:#0060c9:Любовь вызывает сильные эмоции. И не<br />всегда позитивные. Особенно, если объект<br />любви не отвечает взаимностью или ведет<br />себя недостойно.<br /><br />Решить проблемы в личной жизни<br />поможет наша психологическая<br />программа.;'
		+ 'чувство вины:#006ec9:Чувство вины может вызывать тревогу,<br />ухудшать настроение, снижать качество<br />жизни.<br /><br />Наша психологическая программа,<br />которая разрабатывается под каждого<br />человека индивидуально, поможет<br />избавиться от этого разрушающего<br />чувства.;'
		+ 'утрата:#007dc9:При утрате человек может испытывать<br />сильную боль, отчаяние, чувство вины и<br />даже дойти до депрессии.<br /><br />Пережить тяжелое событие поможет<br />специальная психологическая<br />программа.;'
		+ 'адаптация:#008bc9:Адаптация взрослых и детей может<br />сопровождаться негативным<br />эмоциональным состоянием, повышенной<br />тревожностью, нарушением сна.<br /><br />Узнайте, как привыкнуть к новой<br />обстановке без последствий с помощью<br />нашей психологической программы.;'
		+ 'буллинг:#0099c8:Буллинг или травля часто приводит к тому,<br />что жертва начинает терять уверенность в<br />себе. Все это может обернуться трагедией.<br /><br />Узнайте, как бороться с буллингом с<br />помощью нашей психологической<br />программы.;'
		+ 'карьера:#00a7c8:Сложности с построением карьеры<br />приводят к проблемам с самооценкой,<br />неудовлетворенности собственной<br />жизнью.<br /><br />Наша психологическая программа научит<br />вас добиваться успеха и двигаться вверх<br />по карьерной лестнице.;'
		+ 'любовник:#00b3c6:Когда женщина узнает о любовнице у<br />мужа - рушится мир. Она сравнивает себя<br />с соперницей, падает самооценка, в<br />голове крутится куча вопросов.<br /><br />Узнайте, как пережить измену без<br />последствий с помощью нашей<br />психологической программы.;'
		+ 'смена места жительства:#01b6b8:Смена места жительства может приводить<br />к тревожности, страхам, чувству<br />неопределенности.<br /><br />Справиться с этим и спокойно пережить<br />переезд поможет наша психологическая<br />программа.;'
		+ 'низкая самооценка:#01b9aa:Из-за низкой самооценки упускаются<br />перспективы, теряются возможности,<br />часто переживают и тревожатся по<br />пустякам.<br /><br />Специальная психологическая программа<br />поможет обрести уверенность в себе и<br />повысить качество жизни.;';
	var arr = str_el.split(';');
	var str_html_in = '';
	var e = [];
	for (var i = 0; i < arr.length - 1; i++) {
		e = arr[i].split(':');
		str_html_in += str_html.replace('{TEXT}', e[0]).replace('{BACK}', e[1]).replace('{I}', 'v-' + i);
		arr_button.push(e.length > 2 ? e[2] : ''); 
	}
	el.innerHTML = str_html_in
		+ '<div class="what-u-el" style="background: #02bc9c; height: 10em;">'
            + '<div e-name="what-u-button" class="what-u-button"><span>Не могу понять.</span>'
                + '<span>Помогите разобраться в себе!</span></div>'
        + '</div>';

	//command
	el = document.querySelector('.comand [name="b-52"]');
	str_html = '<div class="who l-28"><div class="who-el-1 block ln-24 f-semibold"><span class="f-14">{NAME}</span></div><div class="who-el-2 block"><span>{COMP}</span></div></div>';
	str_el = 'Кети Доусон:(Университет Нового Южного Уэльса (UNSW));'
		+ 'Марк ван Оммерен:(Всемирная Организация Здравоохранения - (ВОЗ));'
		+ 'Нэнси Бэрон:(Институт психосоциальных услуг и обучения);'
		+ 'Пьер Бастин:(Международный комитет Красного Креста);'
		+ 'Джонатан Биссон:(Университет Кардиффа);'
		+ 'Дэн Чизхолм:(Всемирная Организация Здравоохранения - (ВОЗ));'
		+ 'Нирджа Чоудхари:(Сангат, Индия);'
		+ 'Рэйчел Коэн:(Сommon Threads Project, США);'
		+ 'Пим Куиджперс:(Амстердамский свободный университет);'
		+ 'Джоанна Эппинг-Джордан:(Сиэтл, США);'
		+ 'Мишель Функ:(Всемирная Организация Здравоохранения - (ВОЗ);'
		+ 'Клаудиа Гарсия-Морено:(Всемирная Организация Здравоохранения - (ВОЗ);'
		+ 'Стивен Холлон:(Университет Вандербильта);'
		+ 'Сарб Джохал:(Университет Мэсси);'
		+ 'Дейл Джонс:(Всемирная Организация Здравоохранения - (ВОЗ);'
		+ 'Линн Джонс:(Гарвардская школа общественного здоровья);'
		+ 'Берит Кизельбах:(Всемирная Организация Здравоохранения - (ВОЗ);'
		+ 'Аннет Клейбоер:(Амстердамский свободный университет);'
		+ 'Роос Корсте:(Амстердам, Нидерланды);'
		+ 'Айсиха Малик:(Оксфордский университет);'
		+ 'Анита Марини:(Римини, Италия);'
		+ 'Лаура Мюррей:(Университет Джонса Хопкинса);'
		+ 'Себастьян Нкомо Да Гама:(Всемирная Организация Здравоохранения - (ВОЗ);'
		+ 'Бхава Поудьял:(Баку, Азербайджан);'
		+ 'Атиф Рахман:(Университет Ливерпуля);'
		+ 'Элисон Шафер:(World Vision International);'
		+ 'Мариан Шильпероорд:(Управление Верховного комиссара по работе с сообщениями (УВКБ));'
		+ 'Ютаро Сетойя:(Всемирная Организация Здравоохранения - (ВОЗ);'
		+ 'Марит Сийбрандиж:(Амстердамский свободный университет);'
		+ 'Ренато Соуза:(Университет Сан-Паулу);'
		+ 'Витсе Тол:(Университет Джонса Хопкинса);'
		+ 'Питер Вентефогель:(Управление Верховного комиссара по работе с сообщениями (УВКБ));'
		+ 'Хелена Вердели:(Колумбийский университет);'
		+ 'Инка Вайсбекер:(Международный медицинский корпус);'
		+ 'Валери Висард:(Женева, Швейцария);'
		+ 'Таги Ясами:(Всемирная Организация Здравоохранения - (ВОЗ));'
		+ 'Билл Юл:(Королевский колледж Лондона);'
		+ 'Дуг Затзик:(Университет штата Вашингтон);';

	arr = str_el.split(';');
	str_html_in = '';
	e = [];
	for (var i = 0; i < arr.length - 1; i++) {
		e = arr[i].split(':');
		str_html_in += str_html.replace('{NAME}', e[0]).replace('{COMP}', e[1]);
	}
	el.innerHTML += ''
		+ str_html_in
		//+ '<div class="page-next who-full"><p>Скрыть дополнительный список</p></div>'
		+ '';

	
	elements_events(document.querySelector('.ws'));
}

function menu_animation(e) {
	var el = document.querySelector('.header-burger');
	var e1 = document.querySelector('.header-burger span:nth-child(1)');
	var e2 = document.querySelector('.header-burger span:nth-child(2)');
	var e3 = document.querySelector('.header-burger span:nth-child(3)');
	var e4 = document.querySelector('.header-burger span:nth-child(4)');
	var menu = document.querySelector('.menu');
	if (el.getAttribute('start') == '1') {
		el.setAttribute('start', '0');
		e1.style.transform = '';
		e1.style.marginTop = '';
		e2.style.width = '';
		e3.style.width = '';
		e4.style.transform = '';
		e4.style.marginTop = '';
		menu.style.width = '';
	} else {
		el.setAttribute('start', '1');
		e1.style.transform = 'rotate(45deg)';
		e1.style.marginTop = '2.208em';
		e2.style.width = '0';
		e3.style.width = '0';
		e4.style.transform = 'rotate(-45deg)';
		e4.style.marginTop = '2.208em';
		menu.style.width = '24.2em';
		menu.classList.remove('blur');
		setTimeout(function (x) {
			x.classList.add('blur');
		}, 100, menu);
	}
}



function elements_events(e) {
	//console.log('el:' + e);
	if (e.getAttribute('e-name').substr(0, 9) == 'next-page') {
		location.href = '#' + e.getAttribute('e-name').substr(10);
	}
	else if (e.getAttribute('e-name').substr(0, 9) == 'ws') {
		//console.log('e:', e);
		ws_scroll();
	}
}

function ws_position(e) {
	var v = e.getAttribute('start');
	var elg = e.querySelector('[name="b-ws-green"]');
	var elw = e.querySelector('[name="b-ws-white"]');
	if (v == '1') {
		e.style.marginTop = '';
		setTimeout(function (x, xg, xw, xv) { 
			x.style.WebkitAnimation = x.style.animation = 'move-left .5s ease-in-out 0s 1 normal forwards';
			xg.style.WebkitAnimation = xg.style.animation = 'opacity-out .5s ease-in-out 0s 1 normal forwards';
			xw.style.WebkitAnimation = xw.style.animation = 'opacity-in .5s ease-in-out 0s 1 normal forwards';
			x.style.boxShadow = '';
			if (window.pageYOffset) {
				x.style.marginTop = ((screen.height - (screen.height / 3)) / 10) + 'em'; 
			} else {
				x.style.marginTop = '';
			}
		}, 800, e, elg, elw, v);
	} else {
		e.style.WebkitAnimation = e.style.animation = 'move-right .5s ease-in-out 0s 1 normal forwards';
		elg.style.WebkitAnimation = elg.style.animation = 'opacity-in .5s ease-in-out 0s 1 normal forwards';
		elw.style.WebkitAnimation = elw.style.animation = 'opacity-out .5s ease-in-out 0s 1 normal forwards';
		setTimeout(function (x, xv) { 
			x.style.boxShadow = '0 0 0 #fff';
			if (window.pageYOffset) {
				x.style.marginTop = ((screen.height - (screen.height / 3)) / 10) + 'em'; 
			} else {
				x.style.marginTop = '';
			}
		}, 300, e, v);
	}
}

function ws_scroll() {
	var e  = document.querySelector('.ws');
	if (window.pageYOffset) {
		e.setAttribute('start', '0');
		ws_position(e);
	} else {
		e.setAttribute('start', '1');
		ws_position(e);
	}

	//var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	if (who_full.ln) {
		var fl = who_full.full.getBoundingClientRect();
		var curr = fl.top - window.innerHeight;
		var curr_who = who_full.ln * document.body.getAttribute('sz');
		if (isMobile.IE()) {
			if (curr < 0 && curr_who + curr > -100) {
				//console_log('full: ' + curr + ' + ' + curr_who + ' = ' + (curr_who + curr));
				who_full.who.style.position = 'fixed';
				who_full.who.style.top = (window.innerHeight - (6 * document.body.getAttribute('sz'))) + 'px';
			} else {
				who_full.who.style.position = 'absolute';
				who_full.who.style.top = (curr_who + 80) + 'px';
			}
		}
		if (curr < 0 && curr_who + curr > -100) {
			//console_log('full: ' + curr + ' + ' + curr_who + ' = ' + (curr_who + curr));
				who_full.who.style.top = (window.innerHeight - (6 * document.body.getAttribute('sz'))) + 'px';
		}
	}
}

function asksoft_down(el) {
	if (check_right_click(el)) return;
	var e = check_element(el.target);
	if (e.getAttribute) {
		var s = e.getAttribute('e-name');
		if (s == 'mouse-check') {
			var elv = mobil_platform ? el.targetTouches[0] : el;
			document.body.setAttribute('start-n', e.getAttribute('mouse-check'));
			document.body.setAttribute('start-v', elv.pageX);
			document.body.setAttribute('move-v', elv.pageX);
			//console_log('start:' + e.getAttribute('mouse-check') + ' [' + elv.pageX + ']');
		}
	}
}

function asksoft_move(el) {
	if (document.body.getAttribute('start-n')) {
		var e = el.target;
		var elv = mobil_platform ? el.targetTouches[0] : el;
		//console_log('move: ' + document.body.getAttribute('start-n') + ' [' + document.body.getAttribute('start-v') + 'x' + elv.pageX + ']');
		document.body.setAttribute('move-v', elv.pageX);
	}
}

function asksoft_up(el) {
	if (check_right_click(el)) return;
	if (document.body.getAttribute('start-n')) {
		var e = document.querySelector('[mouse-check="' + document.body.getAttribute('start-n') + '"]');
		if (document.body.getAttribute('start-v') == document.body.getAttribute('move-v')) {
			var stext = str_button
				.replace('{SID}', e.getAttribute('mouse-check'))
				.replace('{NAME}', e.innerText)
				.replace('{TEXT}', arr_button[e.getAttribute('mouse-check').substr(2)])
				.replace('{IMG}', asksoft_icons(e.getAttribute('mouse-check').substr(2)));
			if (!e.querySelector('[sid="' + e.getAttribute('mouse-check') + '"]')) {
				e.innerHTML += stext;
			}
			e.style.height = '42.8em';
			setTimeout(function (x) { 
					//x.querySelector('[name="b-4"]').style.borderRadius = '1em';
					x.querySelector('[sid="' + x.getAttribute('mouse-check') + '"]').style.opacity = '1';
					x.querySelector('[sid="' + x.getAttribute('mouse-check') + '"]').style.height = '42.8em';
					var arr = x.parentNode.querySelectorAll('[style^=opacity]');
					if (arr.length == 0) arr = x.parentNode.querySelectorAll('[style^=height]');
					var s = '';
					var e = { };
					for (var i = 0; i < arr.length; i++) {
						e = arr[i];
						s = e.getAttribute('sid');
						if (s) {
							//console_log('close [' + i + ']: ' + s);
							if (s != x.getAttribute('mouse-check')) {
								e.style.opacity = '';
								e.style.height = '';
								e.parentNode.style.height = '';
							}
						}
					}
				}, 100, e);
		} else {
			if (e.querySelector('[sid="' + e.getAttribute('mouse-check') + '"]')) {
				e.querySelector('[sid="' + e.getAttribute('mouse-check') + '"]').style.opacity = '';
				e.querySelector('[sid="' + e.getAttribute('mouse-check') + '"]').style.height = '';
				e.style.height = '';
			}
		}
		//console_log('end: ' + document.body.getAttribute('start-n') + ' [' + document.body.getAttribute('start-v') + 'x' + document.body.getAttribute('move-v') + ']');
		document.body.setAttribute('start-v', 0);
		document.body.setAttribute('start-n', '');
	}
}

function asksoft_click(el) {
	if (check_right_click(el)) return;
	var e = check_element(el.target ? el.target : el);
	if (e.getAttribute) {
		var s = e.getAttribute('e-name');
		if (s == 'mouse-check') {
			//var elv = mobil_platform ? el.targetTouches[0] : el;
			//console_log('click:' + e.getAttribute('mouse-check') + ' [' + elv.pageX + ']');
		}
		else if (s == 'header-burger' || s == 'menu-array') {
			menu_animation(e);
		}
		else if (s == 'who-full') {
			var x = (e.parentNode.querySelectorAll('.who').length - 3) * 6;
			var section = document.querySelector('.comand');
			var b_5 = section.querySelector('[name="b-5"]');
			var b_52 = section.querySelector('[name="b-52"]');
			var img = section.querySelector('.who-full-img');
			var full = section.querySelector('.who-full');
			if (e.getAttribute('start') == '1') {
				e.setAttribute('start', '0');
				//section.style.height = '';
				//b_5.style.height = '';
				//b_52.style.height = '';
				img.style.transform = '';
				section.querySelector('.who-full span').innerHTML = 'Посмотреть весь список';
				setTimeout(function (a1, a2, a3, fl) {
						a1.style.height = '';
						a2.style.height = '';
						a3.style.height = '';
						//fl.style.position = '';
						//fl.style.top = '';
						//fl.classList.remove('blur');
						who_full.who.style.position = '';
						who_full.who.style.top = '';
						who_full.who.classList.remove('blur');
						who_full = {};
					}, 800, section, b_5, b_52, full);
			} else {
				e.setAttribute('start', '1');
				//section.style.height = (x + 90) + 'em';
				//b_5.style.height = (x + 32) + 'em';
				//b_52.style.height = (x + 22) + 'em';
				img.style.transform = 'rotate(180deg)';
				section.querySelector('.who-full span').innerHTML = 'Свернуть список';
				setTimeout(function (a1, a2, a3, a4, fl) {
						a1.style.height = (a4 + 90) + 'em';
						a2.style.height = (a4 + 32) + 'em';
						a3.style.height = (a4 + 22) + 'em';
						//fl.style.position = 'sticky';
						//fl.style.top = ((screen.height / document.body.getAttribute('sz')) - 6).toFixed(4) + 'em';
						//fl.classList.add('blur');
						who_full = {
								full: document.querySelector('.comand [name="b-52"]')
								, ln: document.querySelectorAll('.who').length * 6
								, who: document.querySelector('.who-full')
							};
						who_full.who.style.position = '-webkit-sticky';
						who_full.who.style.position = isMobile.IE() ? 'fixed' : 'sticky';
						who_full.who.classList.add('blur');
						ws_scroll();
					}, 800, section, b_5, b_52, x, full);
			}
		}
		else if (s == 'ws' || s == 'free-start' || s == 'what-u-button' || s == 'free-help-1' || s == 'not-odin-1') {
			sendToWhatsApp('+79153356488', 'Здравствуйте! Хочу узнать больше о консультации с психологом');
		}
		else if (s == 'ws-timer') {
			sendToWhatsApp('+79153356488', 'Здравствуйте! Хочу узнать больше о консультации с психологом. Таймер запущен');
		}
		else if (s == 'ws-promo') {
			sendToWhatsApp('+79153356488', 'Здравствуйте! Хочу узнать больше о консультации с психологом. Я ХОЧУ ИЗМЕНИТЬ СВОЕ БУДУЩЕЕ');
		}
		else if (s == 'free-help-2') {
			//we-help 70.4em;
			//b-5 10.7em;
			//b-6 29.6em;
			if (e.getAttribute('status') == '2') {
				
				document.querySelector('.we-help').style.height = '93em';
				document.querySelector('.our-methods').style.marginTop = '-3.3em';
				document.querySelector('.we-help [name="b-6"]').style.left = '0';
				
				//e.setAttribute('status', '0');
				//document.querySelector('.we-help').style.height = '';
				//document.querySelector('.we-help [name="b-4"]').style.right = '';
				//document.querySelector('.we-help [name="b-5"]').style.left = '';
				//document.querySelector('.we-help [name="b-6"]').style.left = '';
				//setTimeout(function () {
				//	document.querySelector('.we-help [name="b-4"]').style.top = '';
				//}, 400);
			}
			else if (e.getAttribute('status') == '1' && e.getAttribute('timer') == '0') {
				e.setAttribute('status', '2');
				//document.querySelector('.we-help').style.height = '100em';
				document.querySelector('.we-help [name="b-4"]').style.right = '';
				document.querySelector('.we-help [name="b-5"]').style.left = '';
				//document.querySelector('.we-help [name="b-6"]').style.left = '0';
				//setTimeout(function () {
				//	document.querySelector('.we-help [name="b-4"]').style.top = '-2em';
				//	document.querySelector('.we-help [name="b-4"]').style.right = '0';
				//}, 400);
			}
			else if (e.getAttribute('status') == '0' || !e.getAttribute('status')) {
				e.setAttribute('status', '1');
				e.setAttribute('timer', '1');
				document.querySelector('.we-help').style.height = '81.1em';
				document.querySelector('.our-methods').style.marginTop = '-5.7em';
				document.querySelector('.we-help [name="b-4"]').style.right = '0';
				document.querySelector('.we-help [name="b-5"]').style.left = '0';
				setTimeout(set_tick, 1000, 60);
			}
		}
		else if (s.substr(0, 5) == 'menu-' || s.substr(0, 5) == 'scrl-') {
			//console_log('menu-click:' + s.substr(5));
			location.href = '#' + s.substr(5);
			if (s.substr(0, 5) == 'menu-')
			menu_animation(document.querySelector('[e-name="header-burger"]'));
		}
	}
}

function set_tick(v) {
	v -= 1;
	var e = {};
	if (v >= 0) {
		e = document.querySelector('.we-help [name="b-4"] span');
		e.innerHTML = '00:' + (v < 10 ? '0' : '') + v;
		setTimeout(set_tick, 1000, v);
	} else {
		e = document.querySelector('.we-help [name="b-33"]');
		e.setAttribute('timer', '0');
		asksoft_click(e);
	}
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function users_tick() {
	var i = getRandom(20, 31);
	//console_log('tick: ' + i);
	document.querySelector('[name="b-ws-1"]').innerHTML = i.toFixed(0) + ' человек получают';
}

function asksoft_icons(v) {
	var s_style = 'background: url(img/all-icons-80.jpg);background-size: 37.5em 42.8em;background-repeat: no-repeat;';
	var pleft = 0;
	var ptop = -12;
	if (v >= 0 && v < 9) {
		s_style += 'background-position:' + ((pleft - (v * 40)) / 10).toFixed(2) + 'em 0em;';
	}
	else if (v >= 9 && v < 18) {
		v -= 9;
		ptop = ptop * 1 - 40;
		s_style += 'background-position:' + ((pleft - (v * 40)) / 10).toFixed(2) + 'em ' + (ptop / 10).toFixed(2) + 'em;';
	}
	else if (v >= 18 && v < 27) {
		v -= 18;
		ptop = ptop * 2 - (40 * 2);
		s_style += 'background-position:' + ((pleft - (v * 40)) / 10).toFixed(2) + 'em ' + (ptop / 10).toFixed(2) + 'em;';
	}
	else if (v >= 27 && v < 36) {
		v -= 27;
		ptop = ptop * 3 - (40 * 3);
		s_style += 'background-position:' + ((pleft - (v * 40)) / 10).toFixed(2) + 'em ' + (ptop / 10).toFixed(2) + 'em;';
	}
	else if (v >= 36 && v < 45) {
		v -= 36;
		ptop = ptop * 4 - (40 * 4);
		s_style += 'background-position:' + ((pleft - (v * 40)) / 10).toFixed(2) + 'em ' + (ptop / 10).toFixed(2) + 'em;';
	}



	return s_style;
}

function check_element(e) {
	var res = {};
	for (var i = 0; i < 5; i++) {
		if (e.tagName.toUpperCase() == 'BODY' || e.tagName.toUpperCase() == 'HTML') break;
		if (e.getAttribute('e-name')) {
			res = e; //e.getAttribute('e-name');
			break;
		}
		e = e.parentNode;
	}
	return res;
}

function check_right_click(el) {
	var ok = 0;
	if (!mobil_platform) {
		if (el.which ? el.which : 0 || el.button ? el.button : 0) {
			if (!((el.which == 1) || (el.button == 0))) ok = 1;
		}
	}
	return ok;
}

function console_log(s) {
	if (mobil_platform) {
		var c = document.getElementById('console');
		c.innerHTML = s + '\n' + c.innerHTML;
	} else {
		console.log(s);
	}
}

window.addEventListener('scroll', function(e) {
	//console.log('pos:' + window.pageYOffset);
	ws_scroll();
	document.body.setAttribute('start-v', 0);
	document.body.setAttribute('start-n', '');
});

document.addEventListener("DOMContentLoaded", function(event) {
	//document.querySelector('.header-burger').addEventListener('click', menu_animation);
	//document.querySelector('.menu-array').addEventListener('click', menu_animation);
    body_resize();
	site_loading();
	document.addEventListener(asksoft_event['mousedown'], asksoft_down);
	document.addEventListener(asksoft_event['mousemove'], asksoft_move);
	document.addEventListener(asksoft_event['mouseup'], asksoft_up);
	document.addEventListener(asksoft_event['click'], asksoft_click);

	var usersId = setInterval(users_tick, 4000);

});

function sendToWhatsApp(phone, message) {
	
    document.querySelector('div#wm').style.display = 'block';
    
    var form_data = new FormData();
	
	form_data.append('URL', location.href);
	form_data.append('Referrer', document.referrer);
	form_data.append('User-Agent', navigator.userAgent);
	form_data.append('UnixDateTime', new Date().getTime());
	
	var send_url = '/promo/?anticache=' + new Date().getTime();
	var xhr = new XMLHttpRequest(); xhr.open('POST', send_url);
	
	xhr.onreadystatechange = function() {
		
		if (xhr.readyState === XMLHttpRequest.DONE) {
          
			document.querySelector('div#wm').style.display = 'none';
			
			if (xhr.status === 200) {
				
				try {
					
					var response = JSON.parse(xhr.responseText);
					
					if (response.result) {
						
						var link = 'https://api.whatsapp.com/send?phone=' +
						phone.replace(/[^0-9]/g, '') + '&text=' +
						encodeURIComponent(message + ' (мой промокод: ' + response.promocode + ')');
						location.href = link;
						
					}
					
					else {
						
						console.log('Ошибка, не удалось сформиировать промокод:');
						console.dir(xhr);
						
					}
					
				}
				
				catch(err) {
					
					console.log('Ошибка, не удалось сформиировать промокод:');
					console.dir(err);
					
				}
				
			}
			
			else {
				
				console.log('Ошибка, не удалось сформиировать промокод:');
				console.dir(xhr);
				
			}
			
		}
		
	}
	
	xhr.send(form_data);
	
}


