const STARS = 5;
let FILLED_STARS = 3;
let changed = false;

window.onload = function() {
    for (let i = 1; i <= STARS; i++) {
        let starType = 'fa-star-o';
        if (i <= FILLED_STARS) {
            starType = 'fa-star';
        }
        const star = document.createElement('i')
        star.className = 'fa ' + starType
        star.addEventListener('click', fill.bind(this, i))
        star.addEventListener('mouseover', fill.bind(this, i))
        document.getElementById('container').appendChild(star)
    }
    document.getElementById('container').addEventListener('mouseout', reset)

    function reset(event) {
        for (let i = 1; i <= STARS; i++) {
            let starType = 'fa-star-o';
            if (i <= FILLED_STARS) {
                      starType = 'fa-star'
            }
            document.getElementsByClassName('fa')[i-1].className = 'fa ' + starType
        }
    }

    function fill(filled_star, event) {
        console.log(event)
        for (let i = 1; i <= STARS; i++) {
            let starType = 'fa-star-o';
            if (i <= filled_star) {
                      starType = 'fa-star'
            }
            document.getElementsByClassName('fa')[i-1].className = 'fa ' + starType
        }
        if (event.type === 'click') {
                FILLED_STARS = filled_star
        }
    }
}

<div id="container">
  <!-- This element's contents will be replaced with your component. -->
</div>

#container {
  padding: 2em;
}
