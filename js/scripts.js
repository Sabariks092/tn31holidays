/**
 * Tamil Nadu Tourism Website - Main JavaScript
 * Handles navigation, smooth scrolling, package booking, contact forms, and interactive elements
 */

(function () {
  "use strict";

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById("mainNav");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  function handleScrollTopVisibility() {
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    }
  }

  function handleNavbarScroll() {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll);

  // ============================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ============================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: "smooth",
          });
        }
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("scroll", handleScrollTopVisibility);

  // Initial check
  handleScrollTopVisibility();

  // ============================================
  // VIDEO MODAL HANDLING
  // ============================================
  const videoModal = document.getElementById("videoModal");

  if (videoModal) {
    videoModal.addEventListener("hidden.bs.modal", function () {
      // Stop video when modal is closed
      const iframe = this.querySelector("iframe");
      if (iframe) {
        const iframeSrc = iframe.src;
        iframe.src = iframeSrc; // Reload to stop video
      }
    });
  }

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function setActiveNavLink() {
    let current = "";
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      if (href === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNavLink);

  // ============================================
  // LAZY LOADING IMAGES (Native)
  // ============================================
  // Modern browsers support loading="lazy" attribute in HTML
  // This is a fallback for older browsers
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Image will load automatically due to loading="lazy"
          // This observer is just for additional handling if needed

          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  // ============================================
  // FORM VALIDATION (if contact form exists)
  // ============================================
  const bookingForms = document.querySelectorAll("#heroForm, #contactForm");

  bookingForms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Send to Google Apps Script
      const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbyM5d_-xlxwlZu6KE7yhRcxeheqHXj61BHuPQmePPPAq-t9whArczFApUT64YKfcW7aMg/exec"; // USER SHOULD REPLACE THIS

      fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Crucial for Apps Script
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          alert("Thank you! Your request has been submitted successfully.");
          form.reset();
          form.classList.remove("was-validated");
        })
        .catch((error) => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          console.error("Submission error:", error);
          alert("Submission failed. Please try again later.");
        });
    });
  });

  // ============================================
  // MODERN HOVER EFFECTS FOR CARDS
  // ============================================
  const featureCards = document.querySelectorAll(
    ".service-card, .testimonial-card",
  );

  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "";
    });
  });

  // ============================================
  // NOTIFICATION SYSTEM
  // ============================================
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="notification-icon bi ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      if (notification.parentElement) {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  function getNotificationIcon(type) {
    const icons = {
      success: "bi-check-circle-fill",
      error: "bi-exclamation-triangle-fill",
      warning: "bi-exclamation-circle-fill",
      info: "bi-info-circle-fill",
    };
    return icons[type] || icons.info;
  }

  // ============================================
  // ENHANCED FORM VALIDATION
  // ============================================
  // Consolidated form handling above

  function validateInput(input) {
    const isValid = input.checkValidity();

    if (isValid) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    }
  }

  // ============================================
  // PARTNER LOGO ANIMATION ON SCROLL
  // ============================================
  const partnerLogos = document.querySelectorAll(".partner-logo");

  if ("IntersectionObserver" in window) {
    const logoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "scale(1)";
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    partnerLogos.forEach((logo) => {
      logo.style.opacity = "0";
      logo.style.transform = "scale(0.8)";
      logo.style.transition = "all 0.5s ease";
      logoObserver.observe(logo);
    });
  }

  // ============================================
  // PACKAGE BOOKING MODAL
  // ============================================
  function openBookingModal(packageName) {
    const modal = new bootstrap.Modal(
      document.getElementById("packageBookingModal"),
    );
    const packageSelect = document.getElementById("packageName");

    if (packageName) {
      packageSelect.value = packageName;
    }

    modal.show();
  }

  // ============================================
  // CONTACT FORM DYNAMIC FIELDS
  // ============================================
  const contactReason = document.getElementById("contactReason");
  const dynamicFields = document.getElementById("dynamicFields");

  function updateDynamicFields() {
    const reason = contactReason.value;
    let fieldsHTML = "";

    if (reason === "tour-inquiry") {
      fieldsHTML = `
                <div class="row g-2">
                    <div class="col-md-6 mb-3">
                        <label for="startLocation" class="form-label">Start Location</label>
                        <input type="text" class="form-control" id="startLocation" placeholder="Starting city" required>
                        <div class="invalid-feedback">Please provide a start location.</div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="endDestination" class="form-label">End Destination</label>
                        <input type="text" class="form-control" id="endDestination" placeholder="Destination city" required>
                        <div class="invalid-feedback">Please provide an end destination.</div>
                    </div>
                </div>

                <div class="row g-2">
                    <div class="col-md-6 mb-3">
                        <label for="startDateInquiry" class="form-label">Start Date</label>
                        <input type="date" class="form-control" id="startDateInquiry" required>
                        <div class="invalid-feedback">Please provide a start date.</div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="endDateInquiry" class="form-label">End Date</label>
                        <input type="date" class="form-control" id="endDateInquiry" required>
                        <div class="invalid-feedback">Please provide an end date.</div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="numberOfPeople" class="form-label">Number of People</label>
                    <input type="number" min="1" class="form-control" id="numberOfPeople" placeholder="e.g., 2" required>
                    <div class="invalid-feedback">Please specify number of people.</div>
                </div>

                <div class="mb-3">
                    <label for="packageSelection" class="form-label">Select Package</label>
                    <select class="form-select" id="packageSelection" required>
                        <option value="">Choose a package...</option>
                        <option value="temple-tour">Temple Tour Package</option>
                        <option value="hill-station">Hill Station Escape</option>
                        <option value="beach-paradise">Beach Paradise</option>
                        <option value="heritage-circuit">Heritage Circuit</option>
                        <option value="nilgiri-railway">Nilgiri Mountain Railway</option>
                        <option value="complete-tour">Complete Tamil Nadu Tour</option>
                    </select>
                    <div class="invalid-feedback">Please select a package if applicable.</div>
                </div>
            `;
    } else if (reason === "partnership" || reason === "collaboration") {
      fieldsHTML = `
                <div class="mb-3">
                    <label for="companyName" class="form-label">Company Name</label>
                    <input type="text" class="form-control" id="companyName" placeholder="Your company name">
                </div>
                <div class="mb-3">
                    <label for="businessType" class="form-label">Business Type</label>
                    <select class="form-select" id="businessType">
                        <option value="">Select business type...</option>
                        <option value="hotel">Hotel</option>
                        <option value="resort">Resort</option>
                        <option value="transport">Transport</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            `;
    }

    dynamicFields.innerHTML = fieldsHTML;
    // Attach validation handlers for any newly injected inputs/selects
    const newInputs = dynamicFields.querySelectorAll(
      ".form-control, .form-select",
    );

    newInputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateInput(input);
      });

      input.addEventListener("input", function () {
        if (input.classList.contains("is-invalid")) {
          validateInput(input);
        }
      });
    });
  }

  if (contactReason) {
    contactReason.addEventListener("change", updateDynamicFields);
  }

  // ============================================
  // SEARCH TOURS FUNCTION
  // ============================================
  function searchTours() {
    const fromLocation = document.getElementById("fromLocation").value;
    const toLocation = document.getElementById("toLocation").value;
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;

    if (!fromLocation || !toLocation || !fromDate || !toDate) {
      alert("Please fill in all the fields to search for tours.");
      return;
    }

    // Scroll to packages section
    const packagesSection = document.getElementById("packages");
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: "smooth" });
    }

    console.log("Searching tours:", {
      fromLocation,
      toLocation,
      fromDate,
      toDate,
    });
  }

  // Make searchTours globally accessible
  window.searchTours = searchTours;
  window.openBookingModal = openBookingModal;

  // ============================================
  // PACKAGE BOOKING FORM HANDLING
  // ============================================
  const packageBookingForm = document.getElementById("packageBookingForm");

  if (packageBookingForm) {
    packageBookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (this.checkValidity()) {
        const formData = {
          packageName: document.getElementById("packageName").value,
          customerName: document.getElementById("customerName").value,
          customerEmail: document.getElementById("customerEmail").value,
          customerMobile: document.getElementById("customerMobile").value,
          additionalQueries: document.getElementById("additionalQueries").value,
        };

        // Send to Telegram (placeholder function)
        sendToTelegram(formData, "Package Booking");

        // Show success message
        alert("Thank you for your booking enquiry! We will contact you soon.");

        // Reset and close form
        this.reset();
        this.classList.remove("was-validated");

        const modal = bootstrap.Modal.getInstance(
          document.getElementById("packageBookingModal"),
        );
        modal.hide();
      } else {
        this.classList.add("was-validated");
      }
    });
  }

  // ============================================
  // CONTACT FORM HANDLING
  // ============================================
  // Handled by bookingForms listener

  // ============================================
  // TELEGRAM INTEGRATION (Placeholder)
  // ============================================
  function sendToTelegram(data, formType) {
    const botToken = "YOUR_BOT_TOKEN"; // Replace with actual bot token
    const chatId = "YOUR_CHAT_ID"; // Replace with actual chat ID

    let message = `📝 *${formType}*\n\n`;

    if (formType === "Package Booking") {
      message += `📦 *Package:* ${data.packageName}\n`;
      message += `👤 *Name:* ${data.customerName}\n`;
      message += `📧 *Email:* ${data.customerEmail}\n`;
      message += `📱 *Mobile:* ${data.customerMobile}\n`;
      if (data.additionalQueries) {
        message += `💭 *Queries:* ${data.additionalQueries}\n`;
      }
    } else {
      message += `👤 *Name:* ${data.name}\n`;
      message += `📧 *Email:* ${data.email}\n`;
      message += `📱 *Mobile:* ${data.mobile}\n`;
      message += `🎯 *Reason:* ${data.reason}\n`;

      if (data.packageSelection) {
        message += `📦 *Package Interested:* ${data.packageSelection}\n`;
      }
      if (data.companyName) {
        message += `🏢 *Company:* ${data.companyName}\n`;
      }
      if (data.businessType) {
        message += `💼 *Business Type:* ${data.businessType}\n`;
      }

      // Tour inquiry fields
      if (data.startLocation) {
        message += `📍 *Start Location:* ${data.startLocation}\n`;
      }
      if (data.endDestination) {
        message += `📍 *End Destination:* ${data.endDestination}\n`;
      }
      if (data.startDate) {
        message += `🗓️ *Start Date:* ${data.startDate}\n`;
      }
      if (data.endDate) {
        message += `🗓️ *End Date:* ${data.endDate}\n`;
      }
      if (data.numberOfPeople) {
        message += `👥 *Number of People:* ${data.numberOfPeople}\n`;
      }

      message += `💬 *Message:* ${data.message}\n`;
    }

    message += `\n📅 *Date:* ${new Date().toLocaleString()}`;

    // In a real implementation, you would send this to Telegram API
    console.log("Telegram Message:", message);

    // Example API call (commented out for demo):
    /*
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Telegram response:', data);
        })
        .catch(error => {
            console.error('Telegram error:', error);
        });
        */
  }

  // ============================================
  // CAROUSEL INITIALIZATION
  // ============================================
  const carouselElList = document.querySelectorAll(".carousel");
  const carouselList = [...carouselElList].map((carouselEl) => {
    return new bootstrap.Carousel(carouselEl, {
      interval: 5000,
      touch: true,
    });
  });

  // Manual control check if needed
  document.querySelectorAll(".custom-nav").forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-bs-target");
      const slideTo = this.getAttribute("data-bs-slide");
      const carouselElement = document.querySelector(targetId);

      if (carouselElement) {
        const carousel =
          bootstrap.Carousel.getOrCreateInstance(carouselElement);
        if (slideTo === "prev") {
          carousel.prev();
        } else if (slideTo === "next") {
          carousel.next();
        }
      }
    });
  });

  // ============================================
  // CONSOLE MESSAGE
  // ============================================
  console.log(
    "%c🌍 Tamil Nadu Tourism Website",
    "font-size: 20px; color: #FF6B35; font-weight: bold;",
  );
  console.log(
    "%cBuilt with HTML, Bootstrap 5, CSS, and Vanilla JavaScript",
    "font-size: 12px; color: #666;",
  );
})();
