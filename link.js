
// swiper
const swiper = new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween:30,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable:true,
    dynamicBullets:true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints:{
    0:{
        slidesPerView:1
    },
    768:{
        slidesPerView:2
    },
    1024:{
        slidesPerView:3
    },
  }
});

//
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('carousel-Wrapper');
    const originalItems = Array.from(wrapper.children);
    
    // --- Configuration ---
    const itemsPerSlide = 3; // Number of items visible in the container at once (must match CSS layout)
    const slideDuration = 2000; // Time each slide is visible (3 seconds)
    const transitionTime = 600; // Must match the CSS transition time (0.6s)
    
    let itemWidth;
    let totalOriginalItems = originalItems.length;
    let currentIndex = 0;

    // 1. CLONE ITEMS for the infinite effect
    // Clone the first few items and append them to the end
    for (let i = 0; i < itemsPerSlide; i++) {
        let clone = originalItems[i].cloneNode(true);
        clone.classList.add('cloned'); // Optional: Add a class for identification
        wrapper.appendChild(clone);
    }
      
    // Recalculate itemWidth after cloning to ensure correct dimensions
    // Use offsetWidth to include margins/borders if present
    const firstItem = wrapper.querySelector('.Skills_box1');
    itemWidth = firstItem.offsetWidth + (parseFloat(getComputedStyle(firstItem).marginRight) || 0) + (parseFloat(getComputedStyle(firstItem).marginLeft) || 0);

    function slideNext() {
        currentIndex++;
        
        // Calculate the translation distance
        let translateX = -(currentIndex * itemWidth);
        wrapper.style.transform = `translateX(${translateX}px)`;

        // Check if we have moved past the original last item (i.e., we are on the clones)
        if (currentIndex >= totalOriginalItems) {
            
            // Wait for the slide transition to finish
            setTimeout(() => {
                
                // 1. Temporarily disable CSS transition for the 'jump'
                wrapper.style.transition = 'none';
                
                // 2. Instantly jump back to the position of the first original item
                currentIndex = 0; 
                wrapper.style.transform = `translateX(0)`;

                // 3. Re-enable transition for the next automatic slide
                setTimeout(() => {
                    wrapper.style.transition = `transform ${transitionTime / 1000}s ease-in-out`;
                }, 50); // Small delay to ensure the jump is registered
                
            }, transitionTime); 
        }
    }

    // Start the automatic sliding
    setInterval(slideNext, slideDuration);
});

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('carouselWrapper');
    const originalItems = Array.from(wrapper.children);
    
    // --- Configuration ---
    const itemsPerSlide = 3; 
    const slideDuration = 2000; 
    const transitionTime = 600; 
    
    let itemWidth;
    let totalOriginalItems = originalItems.length;
    
    // Start index is shifted back by the number of clones
    let currentIndex = itemsPerSlide - 1; // Start showing the *original* last item

    // 1. CLONE ITEMS for the reverse infinite effect
    // Clone the *last* few items and prepend them to the beginning of the wrapper
    for (let i = totalOriginalItems - 1; i >= totalOriginalItems - itemsPerSlide; i--) {
        let clone = originalItems[i].cloneNode(true);
        wrapper.prepend(clone);
    }
    
    // Get the final list of all items (clones + originals)
    const allItems = Array.from(wrapper.children);
    
    // Recalculate itemWidth after cloning to ensure correct dimensions
    const firstItem = allItems[0];
    itemWidth = firstItem.offsetWidth + (parseFloat(getComputedStyle(firstItem).marginRight) || 0) + (parseFloat(getComputedStyle(firstItem).marginLeft) || 0);

    // 2. INITIAL POSITION: Move the carousel to display the first *original* item (after the prepended clones)
    // The initial translation starts at the index where the first original item begins.
    let initialTranslateX = -(itemsPerSlide * itemWidth);
    wrapper.style.transform = `translateX(${initialTranslateX}px)`;

    // The current index is set relative to the *cloned* starting position
    currentIndex = itemsPerSlide; // The index of the first original item

    function slidePrev() {
        currentIndex--;
        
        // Calculate the translation distance
        let translateX = -(currentIndex * itemWidth);
        wrapper.style.transform = `translateX(${translateX}px)`;

        // Check if we've reached the clone section at the start
        if (currentIndex < itemsPerSlide) {
            
            // Wait for the slide transition to finish
            setTimeout(() => {
                
                // 1. Temporarily disable CSS transition for the 'jump'
                wrapper.style.transition = 'none';
                
                // 2. Instantly jump back to the position of the *last* original item
                currentIndex = totalOriginalItems + itemsPerSlide - 1; 
                let jumpTranslateX = -(totalOriginalItems * itemWidth); // The last original item's position
                wrapper.style.transform = `translateX(${jumpTranslateX}px)`;

                // 3. Re-enable transition for the next automatic slide
                setTimeout(() => {
                    wrapper.style.transition = `transform ${transitionTime / 1000}s ease-in-out`;
                }, 50); 
                
            }, transitionTime); 
        }
    }

    // Start the automatic sliding in reverse
    setInterval(slidePrev, slideDuration);
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle navigation visibility when the hamburger button is clicked
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close the navigation when a link is clicked (useful on mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            // Only close if the nav-links is currently open
            if (navLinks.classList.contains('active')) {
                 navLinks.classList.remove('active');
            }
        });
    });
});