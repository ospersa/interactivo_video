var req = new XMLHttpRequest();
req.open('GET', 'assets/video/master_.webm', true);
req.responseType = 'blob';
req.onload = function() {
    // Onload is triggered even on 404
    // se we need to check the status code
    if (this.status === 200) {
        $('.loader').fadeOut('slow');
        var videoBlob = this.response
        var vid = URL.createObjectURL(videoBlob);
        video.src = vid;
        $('.play').css('opacity', 1);
    }
}
req.onerror = function() {
    console.log("Se presentaron errores en la descarga del video")
}
req.send();

$(document).ready(function () {

    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml1 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    var textWrapper = document.querySelector('.ml11 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    var textWrapperOptionsA = document.querySelector('.ml2 .letters');
    textWrapperOptionsA.innerHTML = textWrapperOptionsA.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    var textWrapperOptionsB = document.querySelector('.ml3 .letters');
    textWrapperOptionsB.innerHTML = textWrapperOptionsB.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    let pauseVideo = true;
    let video = $('#video');
    let firstPart = 9;
    let secondPart = 50;
    let thirdPart = 85;
    let show1 = 43;
    let show2 = 70.5;
    let showQ1 = false;
    let showQ2 = false;
    video.prop('muted', false);

    $('#play').on('click', function() {
        video.trigger('play');
        $('.play').fadeOut('slow');
    })
    $('#start').on('click', function () {
        video.trigger('play');
        pauseVideo = false;
        $(this).fadeOut();
    })
    $('.send').on('click', function () {
        let id = $(this).data('target');
        let modal = $(this).data('modal');
        validateAnswer(id, modal);
    })
    $('.restart').on('click', function() {
        let id = $(this).data('target');
        let modal = $(this).data('modal');
        $(modal + ' .question').removeClass('animate__bounceOutUp').addClass('animate__bounceInUp');
        $(modal + ' .feedback').removeClass('animate__bounceInUp').addClass('animate__bounceOutDown');
    })
    video.on('timeupdate', function () {
        let currentTime = $(this).prop('currentTime');
        let duration = $(this).prop('duration');
        if (currentTime >= firstPart && currentTime < secondPart && pauseVideo == true && showQ1 == false) {
            $(this).trigger('pause');
            $('#first-part').fadeIn();
        } else if (currentTime >= show1 && showQ1 == false) {
            showQ1 = true
            $('#btnModalQ1').click();
            pauseVideo = true
            anime.timeline()
                .add({
                    targets: '.ml1 .letter',
                    scale: [0.3, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeInExpo",
                    duration: 600,
                    delay: (el, i) => 70 * (i + 1)
                }).add({
                    targets: '.ml1 .line',
                    scaleX: [0, 1],
                    opacity: [0.5, 1],
                    easing: "easeInExpo",
                    duration: 600,
                    offset: '-=875',
                    delay: (el, i, l) => 80 * (l - i)
                }).add({
                    targets: '.ml2 .text-wrapper',
                    scale: [0.3, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeInExpo",
                    duration: 600,
                    delay: (el, i) => 70 * (i + 1)
                }).add({
                    targets: '.ml3 .text-wrapper',
                    scale: [0.3, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeInExpo",
                    duration: 600,
                    delay: (el, i) => 70 * (i + 1)
                })
                setTimeout(function(){
                    $('#s1').fadeIn('slow')
                }, 7000)
        } else if (currentTime >= secondPart && pauseVideo == true && currentTime <= show2) {
            $(this).trigger('pause');
            pauseVideo = false
        } else if (currentTime >= show2 && showQ2 == false) {
            showQ2 = true
            $('#btnModalQ2').click();
            pauseVideo = true
            anime.timeline()
                .add({
                    targets: '.ml11 .letter',
                    scale: [0.3, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeInExpo",
                    duration: 400,
                    delay: (el, i) => 70 * (i + 1)
                }).add({
                    targets: '.ml11 .line',
                    scaleX: [0, 1],
                    opacity: [0.5, 1],
                    easing: "easeInExpo",
                    duration: 600,
                    offset: '-=875',
                    delay: (el, i, l) => 80 * (l - i)
                })
            $('.opt').each(function() {
                $(this).addClass('animate__fadeIn');
            })
            setTimeout(function(){
                $('#s2').fadeIn('slow')
            }, 15000)
        } else if (currentTime >= thirdPart && pauseVideo == true) {
            $(this).trigger('pause');
            pauseVideo = false
        } else if (currentTime >= (duration - 1)) {
            $(this).trigger('pause');
        }
    })
    $('#btnModalQ1').on('click', function () {
        $('#modalQ1').css('display', 'flex');
        $('#modalQ1 .modal-contenido').addClass('animate__fadeInUp');
    });
    $('#btnModalQ2').on('click', function () {
        $('#modalQ2').css('display', 'flex');
        $('#modalQ2 .modal-contenido').addClass('animate__fadeInUp');
    });
})

function validateAnswer(idQ, modal) {
    let answer
    if (idQ == "#q1") {
        answer = $(idQ + ' input[name="q1"]:checked').val();
        if (answer == undefined) {
            alert('Por favor seleccione una de las opciones para poder continuar.')
        } else if (answer == 'l') {
            $(modal + ' .question').removeClass('animate__bounceInDown').addClass('animate__bounceOutUp');
            $(modal + ' .feedback').html(
                '<div class="message">' + 
                    '<p>Recuerda que un municipio que tiene la población superior a los 100 mil habitantes, un plan de ordenamiento territorial aprobado, en muchos casos con su estructura ecológica incorporada, es considerado de <b>alta dinámica</b>.</p><br>' + 
                    '<p>Además, este tipo de municipios tienen recursos económicos altos y una capacidad de gestión fortalecida, tienden a especializarse en comercio y servicios y, generalmente, son de categoría especial y primera</p>' + 
                    '<button class="restart btn" onclick="showQuestion(\'#modalQ1\');">reintentar</button>' +
                '</div>'
            );
            $(modal + ' .feedback').removeClass('animate__bounceOutDown').addClass('animate__bounceInUp');
        } else if (answer == 'h') {
            $(modal + ' .question').removeClass('animate__bounceInDown').addClass('animate__bounceOutUp');
            $(modal + ' .feedback').html('<h2>Bien hecho</h2>');
            $(modal + ' .feedback').removeClass('animate__bounceOutDown').addClass('animate__bounceInUp');
            setTimeout(function () {
                $('#modalQ1 .modal-contenido').removeClass('animate__fadeInUp').addClass('animate__fadeOutUp');
                $('#modalQ1').fadeOut('slow');
                $('#video').trigger('play')
            }, 3000)
        }
    } else if (idQ == "#q2") {
        let valid = 0;
        let wrong = 0;
        $(idQ + ' input[name="q2"]:checked').each(function(){
            if ($(this).val() == 'v') {
                valid += 1;
            } else {
                wrong += 1;
            }
        });
        if (valid == 3 && wrong == 0) {
            $(modal + ' .question').removeClass('animate__bounceInDown').addClass('animate__bounceOutUp');
            $(modal + ' .feedback').html('<h2>Bien hecho</h2>');
            $(modal + ' .feedback').removeClass('animate__bounceOutDown').addClass('animate__bounceInUp');
            setTimeout(function () {
                $('#modalQ2 .modal-contenido').removeClass('animate__fadeInUp').addClass('animate__fadeOutUp');
                $('#modalQ2').fadeOut('slow');
                $('#video').trigger('play')
            }, 3000)
        } else {
            $(modal + ' .question').removeClass('animate__bounceInDown').addClass('animate__bounceOutUp');
            $(modal + ' .feedback').html(
                '<div class="message">' + 
                    '<p>Un municipio con estas características es considerado un municipio de baja dinámica. Si sus actividades económicas están enfocadas en turismo o agricultura, puede optar por instrumento económicos de educación, por ejemplo, negocios verdes o certificaciones y sellos, lo que puede contribuir a incrementar ingresos y a la vez garantizar la conservación de la biodiversidad.</p><br>' + 
                    '<p>De esta manera, el instrumento de tarifas se puede usar para definir un valor de entrada a las áreas de conservación. Los instrumentos de tasas ambientales y planes parciales son más recomendados para aplicarse en municipios de alta dinámica.</p>' + 
                    '<button class="restart btn" onclick="showQuestion(\'#modalQ2\');">reintentar</button>' +
                '</div>'
            );
            $(modal + ' .feedback').removeClass('animate__bounceOutDown').addClass('animate__bounceInUp');
        }
    }
}

function showQuestion(modal) {
    $(modal + ' .question').removeClass('animate__bounceOutUp').addClass('animate__bounceInDown');
    $(modal + ' .feedback').removeClass('animate__bounceInUp').addClass('animate__bounceOutDown');
    $(modal + ' input').each(function() {
        $(this).prop('checked', false)
    })
}