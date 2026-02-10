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

      // Skip if it's just "#" or modal trigger
      if (href === "#" || this.hasAttribute("data-bs-toggle")) {
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarCollapse = document.getElementById("navbarNav");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      }
    });
  });

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  function handleScrollTopVisibility() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.remove("hidden");
    } else {
      scrollTopBtn.classList.add("hidden");
    }
  }

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

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
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity()) {
        // Fake form submission
        console.log("Form submitted successfully!");

        // Show success message
        alert("Thank you for your message! We will get back to you soon.");

        // Reset form
        form.reset();
        form.classList.remove("was-validated");
      } else {
        form.classList.add("was-validated");
      }
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
  forms.forEach((form) => {
    const inputs = form.querySelectorAll(".form-control, .form-select");

    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateInput(input);
      });

      input.addEventListener("input", function () {
        if (input.classList.contains("is-invalid")) {
          validateInput(input);
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (!form.checkValidity()) {
        form.style.animation = "shake 0.5s ease";
        setTimeout(() => {
          form.style.animation = "";
        }, 500);

        form.classList.add("was-validated");
        return;
      }

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          showNotification("Form submitted successfully!", "success");
          form.reset();
          form.classList.remove("was-validated");
        }, 2000);
      }
    });
  });

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
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (this.checkValidity()) {
        const formData = {
          name: document.getElementById("contactName").value,
          email: document.getElementById("contactEmail").value,
          mobile: document.getElementById("contactMobile").value,
          reason: document.getElementById("contactReason").value,
          message: document.getElementById("contactMessage").value,
        };

        // Add dynamic fields if they exist
        const packageSelection = document.getElementById("packageSelection");
        if (packageSelection) {
          formData.packageSelection = packageSelection.value;
        }

        const companyName = document.getElementById("companyName");
        if (companyName) {
          formData.companyName = companyName.value;
        }

        const businessType = document.getElementById("businessType");
        if (businessType) {
          formData.businessType = businessType.value;
        }

        // Tour inquiry specific fields
        const startLocation = document.getElementById("startLocation");
        if (startLocation) {
          formData.startLocation = startLocation.value;
        }

        const endDestination = document.getElementById("endDestination");
        if (endDestination) {
          formData.endDestination = endDestination.value;
        }

        const startDateInquiry = document.getElementById("startDateInquiry");
        if (startDateInquiry) {
          formData.startDate = startDateInquiry.value;
        }

        const endDateInquiry = document.getElementById("endDateInquiry");
        if (endDateInquiry) {
          formData.endDate = endDateInquiry.value;
        }

        const numberOfPeople = document.getElementById("numberOfPeople");
        if (numberOfPeople) {
          formData.numberOfPeople = numberOfPeople.value;
        }

        // Send to Telegram (placeholder function)
        sendToTelegram(formData, "Contact Form");

        // Show success message
        alert("Thank you for contacting us! We will get back to you soon.");

        // Reset form
        this.reset();
        this.classList.remove("was-validated");
        dynamicFields.innerHTML = "";
      } else {
        this.classList.add("was-validated");
      }
    });
  }

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
