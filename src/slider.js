class Slider {

    constructor({ imagesGap = "16px" , imageWidth = "300px" }) {

        this.slider = document.querySelector(".slider");
        this.sliderBox = document.querySelector(".slider__box");
        this.sliderImages = document.querySelectorAll(".slider__image");

      

        if(imagesGap !== '16px' || imageWidth !== '300px') {
            
            /* this function will reset the width of all images and the gap between them  */
            this.resetSliderProporties(imagesGap , imageWidth);
        }

        this.sliderBoxWidth = this.sliderBox.offsetWidth;
        this.sliderImageWidth = this.sliderImages[0].offsetWidth;
        this.sliderImagesNumber =  this.sliderImages.length;

        /* calculate the amount of scroll needed when scrolling */
        this.scrollPerClick = this.sliderImageWidth + parseInt(imagesGap);

        /* calculate the total amount that could scrolled*/
        this.totalScrollAmount = (this.sliderImageWidth * this.sliderImagesNumber) + (parseInt(imagesGap) * (this.sliderImagesNumber-1))

        /* calculate how many images are fully displayed */
        this.imagesInViewNumber = ~~(this.sliderBoxWidth/this.scrollPerClick)

        /* keep track of the amount scrolled */
        this.currentScrollAmount = 0

          /* this function is responsible of the creation of scroll buttons and progress bar */
          this.createHtmlElements()
          
          this.MobileProgressBar()

    }

     MobileProgressBar() {
        
         this.sliderBox.addEventListener("scroll",() =>{
            const maxScrollLeft = this.sliderBox.scrollWidth - this.sliderBox.clientWidth;

            /* when multiplying scrollLeft value with this factor it  converts to progressbar width with a max of 200px  */
            const factor = parseInt(this.progress.clientWidth)/ maxScrollLeft;

          
            /* add the previous progressbar width  */
            const newProgressBarWidth = this.sliderBox.scrollLeft * factor;

            console.log("newProgressBarWidth",newProgressBarWidth)
            console.log("clientwidth",this.progressBar.clientWidth)
            console.log("initial client width", this.initialProgressBarWidth)

            /* assign the new calculated width to the progress bar */
            if( newProgressBarWidth < this.initialProgressBarWidth) {
                /* if the new width is less than the intial width do nothing */
                this.progressBar.clientWidth
            }
            else {
                this.progressBar.style.width =  `${newProgressBarWidth}px`
            }
            
         
         })
     }

     resetSliderProporties(imagesGap, imageWidth) {
        this.sliderBox.style.gap = imagesGap ; 
        this.sliderImages.forEach(image => {
            image.style.width = imageWidth;
        })
    }

    scrollRight() {
        const scrollAmountLeft = this.totalScrollAmount - (this.currentScrollAmount + this.sliderBoxWidth )
  
          /* increase progress bar percentage */
          this.progressBar.style.width =  `${parseInt(this.progressBar.style.width)+this.progressBarPercentage}px`;

        if( scrollAmountLeft > this.scrollPerClick) {

            /* show left scroll images when we scroll right */
            this.leftScroll.style.display= "block";
          
            this.sliderBox.scrollTo({
                top:0,
                left: (this.currentScrollAmount+=this.scrollPerClick),
                behavior: 'smooth'
            })
          
        }
        else {
            this.sliderBox.scrollTo({
                top: 0,
                left: (this.currentScrollAmount+=scrollAmountLeft),
                behavior: 'smooth'
            })

            /* hide right scroll button if we reach last image*/
            this.rightScroll.style.display = "none"
        }
    }

    scrollLeft() {
        const scrollAmountLeft = this.currentScrollAmount - this.scrollPerClick
              /* decrease progress bar percentage */
              this.progressBar.style.width =  `${parseInt(this.progressBar.style.width)-this.progressBarPercentage}px`;
        if( this.currentScrollAmount > this.scrollPerClick) {

            /* enable right scroll button */
            this.rightScroll.style.display = "block"
            this.sliderBox.scrollTo({
                left: ( this.currentScrollAmount -= this.scrollPerClick),
                behavior: 'smooth'
            })
        }
        else {
            console.log("else")
            this.sliderBox.scrollTo({
                left: (-this.currentScrollAmount),
                behavior: 'smooth'
            })
            /* hide left scroll button if we reach last image*/
            this.leftScroll.style.display = "none"
            this.currentScrollAmount = 0;
        }
    }

    createHtmlElements() {
        /* right button */
        this.rightScroll = document.createElement("button")
        const rightIcon = document.createTextNode('>');
        this.rightScroll.appendChild(rightIcon)
        this.rightScroll.classList.add("slider__scroll","scroll--right")
        this.rightScroll.onclick = () => {
            this.scrollRight();
        }

        /* if there's nothing to scroll from the start hide right button  */
        if(this.imagesInViewNumber === this.sliderImagesNumber) {
            this.rightScroll.style.display = "none";
        }

        /* left button */
        this.leftScroll = document.createElement("button") 
        const leftIcon = document.createTextNode('<');
        this.leftScroll.appendChild(leftIcon)
        this.leftScroll.classList.add("slider__scroll","scroll--left")

        /* left scroll button is hidden by default */
        this.leftScroll.style.display = "none"
        this.leftScroll.onclick = () => {
            this.scrollLeft();
        }

        /* progress bar */
        this.progress = document.createElement("div")
        this.progress.classList.add("slider__progress-bar")
        this.progressBar =  document.createElement("span")
        this.progressBar.classList.add("progress-bar__span")
        this.progress.appendChild(this.progressBar)

        /* append children to the slider node */
        this.slider.append(this.rightScroll,this.leftScroll,this.progress)
 
         /* calculate initial progressBar percentage */
        this.progressBarPercentage = ~~(this.progress.clientWidth/this.sliderImagesNumber)
        this.progressBar.style.width =`${this.progressBarPercentage*this.imagesInViewNumber}px`

        /* keep track of the initial progress bar width */
        this.initialProgressBarWidth = parseInt(this.progressBar.style.width)
       
       
    }
}