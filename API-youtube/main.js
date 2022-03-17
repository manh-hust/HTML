$(document).ready(function () {

    // Lựa video cho monitor
    const monitor2 = $('.monitor')
    monitor2.hide()

    // Search Data API
    var API_KEY = "AIzaSyBLGK2UiUeT0vwNMMkTSE4Marp3Nz2eovI"
    var video = ''

    $('form').submit(function (e) {

        e.preventDefault()

        const btnSubmit = $('.btn-submit')
        const search = $("#search").val()

        if (search) {
            $("#videos").children('.card').remove()
            videoSearch(API_KEY, search, 10)
        }
    })

    function videoSearch(key, search, max) {
        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key +
            "&type=video&part=snippet&maxResults=" + max + "&q=" + search,
            function (data) {
                data.items.forEach(item => {
                    video = `
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="${item.snippet.thumbnails.medium.url}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${item.snippet.title}</h5>
                            <button class="btn btn-primary btn-watch" data-id="${item.id.videoId}" }>Watch Now</button>
                        </div>
                    </div>
                    `
                    $("#videos").append(video)
                });
                const btns = $(".btn-watch")
                btns.each(function (item) {
                    const videoId = $(this).data('id')
                    $(this).click(function () {
                        if (monitor2.children().length > 0) {
                            monitor2.children('iframe').remove();
                        }
                        monitor2.append(renderIframe(videoId))
                        monitor2.show()
                    })

                })

            })
    }

    // Drapable monitor

    let x = 0
    let y = 0
    const monitor = document.querySelector(".monitor")
    const mouseDownHandle = function (e) {
        x = e.clientX
        y = e.clientY

        document.addEventListener('mousemove', mouseMoveHandle)
        document.addEventListener('mouseup', mouseUpHandle)

    }
    const mouseMoveHandle = function (e) {

        const dx = e.clientX - x
        const dy = e.clientY - y

        monitor.style.left = `${monitor.offsetLeft + dx}px`
        monitor.style.top = `${monitor.offsetTop + dy}px`

        x = e.clientX
        y = e.clientY
    }
    const mouseUpHandle = function (e) {
        document.removeEventListener('mousemove', mouseMoveHandle)
        document.removeEventListener('mouseup', mouseUpHandle)
    }
    monitor.addEventListener('mousedown', mouseDownHandle)

    // Close Monitor
    $('.icon').click(function () {
        monitor2.hide()
        monitor2.children('iframe').remove();
    })


    function renderIframe(id) {
        return `<iframe width="480" height="270" src="http://www.youtube.com/embed/${id}" frameborder="0"
        allowfullscreen></iframe>`
    }

})