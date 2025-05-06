// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}


  // Get the current page's URL path
  const currentUrl = window.location.pathname;
   const links = document.querySelectorAll(".nav-links a");

 
  links.forEach((link) => {
    
    if (link.pathname === currentUrl) {
      link.classList.add("active");  // Add 'active' class if it's the current page
    } else {
      link.classList.remove("active");  // Remove 'active' class from other links
    }

    // Add event listener to each link to remove active class and close the menu
    link.addEventListener("click", () => {
      // Remove the active class from all links
      links.forEach((otherLink) => otherLink.classList.remove("active"));
      
      // Add active class to the clicked link
      link.classList.add("active");

      // Close the hamburger menu when a link is clicked (on mobile view)
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });


// Testimonials Slider
const testimonials = document.querySelectorAll(".testimonial");
const dots = document.querySelectorAll(".dot");

if (testimonials.length > 0 && dots.length > 0) {
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => testimonial.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
    currentTestimonial = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index);
    });
  });

  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 5000);
}

// Gallery Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

if (filterBtns.length > 0 && galleryItems.length > 0) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// Lightbox Gallery
const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.querySelector(".lightbox-caption");
const closeLightbox = document.querySelector(".close-lightbox");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

if (galleryImages.length > 0 && lightbox) {
  let currentImageIndex = 0;

  // Open lightbox
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;

      // Get caption from overlay
      const caption = img.nextElementSibling.querySelector("h3").textContent;
      lightboxCaption.textContent = caption;

      currentImageIndex = index;
    });
  });

  // Close lightbox
  closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Click outside image to close
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  prevBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;

    const caption = galleryImages[currentImageIndex].nextElementSibling.querySelector("h3").textContent;
    lightboxCaption.textContent = caption;
  });

  nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;

    const caption = galleryImages[currentImageIndex].nextElementSibling.querySelector("h3").textContent;
    lightboxCaption.textContent = caption;
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowLeft") {
        prevBtn.click();
      } else if (e.key === "ArrowRight") {
        nextBtn.click();
      } else if (e.key === "Escape") {
        lightbox.style.display = "none";
      }
    }
  });
}

// Accordion
const accordionItems = document.querySelectorAll(".accordion-item");

if (accordionItems.length > 0) {
  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {
      item.classList.toggle("active");

      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
    });
  });
}

// Appointment Form Validation
const appointmentForm = document.getElementById("appointment-form");
const formMessage = document.getElementById("form-message");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic form validation
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!name || !email || !phone || !service || !date || !time) {
      formMessage.textContent = "Please fill in all required fields.";
      formMessage.className = "form-message error";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.className = "form-message error";
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
      formMessage.textContent = "Please enter a valid 10-digit phone number.";
      formMessage.className = "form-message error";
      return;
    }

    formMessage.textContent = "Appointment request submitted successfully! We will contact you shortly to confirm.";
    formMessage.className = "form-message success";

    // Reset form
    appointmentForm.reset();
  });
}
