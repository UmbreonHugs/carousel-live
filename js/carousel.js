// lets start with the variables
let images = ["img/dikaseva-34881-unsplash.jpg", 
"img/mark-basarab-122141-unsplash.jpg", 
"img/milada-vigerova-35578-unsplash.jpg",
"img/riccardo-chiarini-365677-unsplash.jpg",
"img/thomas-morse-349005-unsplash.jpg"
]
let position = 0
/**
 * updatePosition updates the index of the current slide, along with the indicators
 * @param i Index of the slider
 */
let updatePosition = (i) => {
    // set position
    position = i
    // remove the active class, then add one
    $(".indicators li button").children('i').removeClass('fa-dot-circle')
    $('.carousel-item.active').removeClass('active').promise().then(function(){
        $(".carousel-item[data-index="+ i +"]").addClass('active')
        $(".indicators li button[data-index="+ i +"]").children('i').addClass('fa-dot-circle')
    })
    // reset the slideshow timer
    slideshow()
}
let interval;
/**
 * slideshow changes the slide every 5 seconds. If this function is called, the interval resets.
 */
let slideshow = () => {
    clearInterval(interval);  
    interval = setInterval(function(){
        position = position + 1
        if (position >= images.length) {
            position = 0;
        }
        updatePosition(position)
    }, 5000) 
}
/**
 * Generates the carousel images from the array and turns them into 5 images with the first one being the active one
 */
let generateCarousel = () => {
    document.querySelector('.indicators').innerHTML = [...Array(images.length)].map((_e, index) => {
        let html = `<li><button onClick="updatePosition(${index})" aria-label=${index} data-index="${index}"><i class="fas fa-circle"></i></button></li>`
        return html
    }).join('')
    document.querySelector('.item').innerHTML = images.map((image, index) => {
        let html
        if (position === index) {
            html = `<div class="carousel-item fade active" data-index="${index}"><img src="${image}" alt="Image ${index}" /></div>`
            $(".indicators li button[data-index="+ index +"]").children('i').addClass('fa-dot-circle')
        } else {
            html = `<div class="carousel-item fade" data-index="${index}"><img src="${image}" alt="Image ${index}"/></div>`
        }
        return html
    }).join('')
    slideshow()
}
/**
 * Back button
 */
$('.button-previous').on('click', function(){
    position = position - 1
    if (position < 0) {
        position = images.length - 1
    }
    updatePosition(position)
})
/**
 * Forward button
 */
$('.button-next').on('click', function(){
    position = position + 1
    if (position >= images.length) {
        position = 0;
    }
    updatePosition(position)
})
generateCarousel()