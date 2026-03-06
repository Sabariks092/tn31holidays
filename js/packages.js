// Make sure Bootstrap JS (bundle) is loaded before this file.

// ===== PACKAGE DATA =====
const packages = [
  {
    id: 1,
    slug: "temple-trail-tamil-nadu",
    title: "TEMPLE TRAIL TAMIL NADU",
    tag: "Spiritual Journey",
    category: "Spiritual",
    destination: "Madurai, Rameshwaram, Kanyakumari",
    startingCity: "Chennai",
    duration: "5 Days / 4 Nights",
    accommodation: "3-star hotels",
    meals: "All meals included",
    price: 12999,
    rating: 4.7,
    reviews: 124,
    availableSeats: 18,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    subtitle: "Explore the spiritual heart of Tamil Nadu",

    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
      "https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?w=800&q=80",
      "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&q=80"
    ],

    highlights: [
      { label: "Duration", value: "5D / 4N" },
      { label: "Temples", value: "10+ Sacred Sites" },
      { label: "Meals", value: "All Included" },
      { label: "Transport", value: "AC Vehicle" }
    ],

    itinerary: [
      "Day 1: Arrival in Madurai and Meenakshi Temple visit",
      "Day 2: Travel to Rameshwaram and temple darshan",
      "Day 3: Dhanushkodi sightseeing",
      "Day 4: Travel to Kanyakumari and sunset view",
      "Day 5: Sunrise and departure"
    ]
  },

  {
    id: 2,
    slug: "hill-station-retreat",
    title: "HILL STATION RETREAT",
    tag: "Nature Escape",
    category: "Hill Station",
    destination: "Ooty, Coonoor, Kotagiri",
    startingCity: "Coimbatore",
    duration: "4 Days / 3 Nights",
    accommodation: "Premium resorts",
    meals: "Breakfast included",
    price: 15999,
    rating: 4.8,
    reviews: 201,
    availableSeats: 12,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=80",
    subtitle: "Experience the Queen of Hill Stations",

    gallery: [
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80"
    ],

    highlights: [
      { label: "Duration", value: "4D / 3N" },
      { label: "Altitude", value: "2,240m Peak" },
      { label: "Climate", value: "Cool & Pleasant" },
      { label: "Activities", value: "Nature Walks" }
    ],

    itinerary: [
      "Day 1: Arrival in Ooty",
      "Day 2: Ooty lake and botanical garden",
      "Day 3: Coonoor toy train and tea estates",
      "Day 4: Kotagiri sightseeing and departure"
    ]
  },

  {
    id: 3,
    slug: "coastal-paradise",
    title: "COASTAL PARADISE",
    tag: "Beach Bliss",
    category: "Beach",
    destination: "Mahabalipuram, Pondicherry",
    startingCity: "Chennai",
    duration: "3 Days / 2 Nights",
    accommodation: "Beach resorts",
    meals: "Breakfast & Dinner",
    price: 9999,
    rating: 4.6,
    reviews: 89,
    availableSeats: 20,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
    subtitle: "Sun, sand, and heritage by the Bay of Bengal",

    gallery: [
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80"
    ],

    highlights: [
      { label: "Duration", value: "3D / 2N" },
      { label: "Beaches", value: "5+ Pristine" },
      { label: "UNESCO Sites", value: "Shore Temple" },
      { label: "Cuisine", value: "French & Tamil" }
    ],

    itinerary: [
      "Day 1: Chennai to Mahabalipuram",
      "Day 2: Shore Temple and beach activities",
      "Day 3: Pondicherry heritage walk"
    ]
  },

  {
    id: 4,
    slug: "wildlife-explorer",
    title: "WILDLIFE EXPLORER",
    tag: "Adventure Safari",
    category: "Wildlife",
    destination: "Mudumalai, Bandipur",
    startingCity: "Coimbatore",
    duration: "3 Days / 2 Nights",
    accommodation: "Forest lodges",
    meals: "All meals included",
    price: 11999,
    rating: 4.7,
    reviews: 97,
    availableSeats: 10,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    subtitle: "Encounter the wild side of Tamil Nadu",

    gallery: [
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80"
    ],

    highlights: [
      { label: "Duration", value: "3D / 2N" },
      { label: "Safaris", value: "4 Game Drives" },
      { label: "Wildlife", value: "Elephants, Tigers" },
      { label: "Birds", value: "200+ Species" }
    ]
  },

  {
    id: 5,
    slug: "heritage-culture-trail",
    title: "HERITAGE & CULTURE TRAIL",
    tag: "Heritage Walk",
    category: "Culture",
    destination: "Thanjavur, Trichy, Kumbakonam",
    startingCity: "Chennai",
    duration: "4 Days / 3 Nights",
    accommodation: "Boutique stays",
    meals: "Breakfast & Dinner",
    price: 10999,
    rating: 4.6,
    reviews: 76,
    availableSeats: 15,
    featured: false,
    image:
      "./assets/2245.jpg",
    subtitle: "Dive deep into Tamil Nadu’s rich heritage",

    highlights: [
      { label: "UNESCO Temples", value: "3+" },
      { label: "Cultural Shows", value: "Traditional Arts" },
      { label: "Cuisine", value: "Authentic Tamil Meals" },
      { label: "Guided Tours", value: "Local Experts" }
    ]
  },

  {
    id: 6,
    slug: "family-fun-tamil-nadu",
    title: "FAMILY FUN TAMIL NADU",
    tag: "Family Special",
    category: "Family",
    destination: "Chennai, Mahabalipuram, Pondicherry",
    startingCity: "Chennai",
    duration: "5 Days / 4 Nights",
    accommodation: "Family-friendly hotels",
    meals: "Breakfast included",
    price: 13499,
    rating: 4.5,
    reviews: 112,
    availableSeats: 22,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=800&q=80",
    subtitle: "Perfect mix of fun, learning and relaxation",

    highlights: [
      { label: "Kid-friendly", value: "Activities & Play" },
      { label: "Beaches", value: "Safe & Clean" },
      { label: "Attractions", value: "Museums & Parks" },
      { label: "Pace", value: "Relaxed Itinerary" }
    ]
  },

  {
    id: 7,
    slug: "weekend-getaway",
    title: "WEEKEND GETAWAY",
    tag: "Short Break",
    category: "Weekend",
    destination: "Yelagiri / Yercaud",
    startingCity: "Chennai",
    duration: "2 Days / 1 Night",
    accommodation: "Comfort stays",
    meals: "Breakfast included",
    price: 7999,
    rating: 4.4,
    reviews: 58,
    availableSeats: 25,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=800&q=80",
    subtitle: "Quick escape to the hills to recharge",

    highlights: [
      { label: "Duration", value: "2D / 1N" },
      { label: "Drive Time", value: "4–6 hrs from Chennai" },
      { label: "Activities", value: "Trekking / Boating" },
      { label: "Best For", value: "Couples & Friends" }
    ]
  },

  {
    id: 8,
    slug: "full-tamil-nadu-circuit",
    title: "FULL TAMIL NADU CIRCUIT",
    tag: "Grand Tour",
    category: "Explorer",
    destination: "Chennai, Madurai, Rameshwaram, Kanyakumari, Ooty",
    startingCity: "Chennai",
    duration: "10 Days / 9 Nights",
    accommodation: "Mixed — city & hill stays",
    meals: "Breakfast included",
    price: 24999,
    rating: 4.9,
    reviews: 310,
    availableSeats: 8,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1541417904950-b855846fe074?w=800&q=80",
    subtitle: "One grand circuit covering iconic TN destinations",

    highlights: [
      { label: "Major Cities", value: "5+" },
      { label: "Experiences", value: "Temple, Beach, Hills" },
      { label: "Ideal For", value: "Families & Groups" },
      { label: "Customisation", value: "Highly Flexible" }
    ]
  }
];

// ===== MODAL LOGIC (Bootstrap) =====
function openModal(id) {
  const pkg = packages.find((p) => p.id === id);
  if (!pkg) return;

  // Populate modal content
  const imgEl = document.getElementById("packageModalImage");
  const titleEl = document.getElementById("packageModalLabel");
  const tagEl = document.getElementById("packageModalTag");
  const priceEl = document.getElementById("packageModalPrice");
  const metaEl = document.getElementById("packageModalMeta");
  const descEl = document.getElementById("packageModalDescription");
  const highlightsEl = document.getElementById("packageModalHighlights");

  if (imgEl) {
    imgEl.src = pkg.image;
    imgEl.alt = pkg.title;
  }
  if (titleEl) titleEl.textContent = pkg.title;
  if (tagEl) tagEl.textContent = pkg.tag;
  if (priceEl) priceEl.textContent = pkg.price;
  //   if (descEl) descEl.textContent = pkg.subtitle;

  // Highlights
  if (highlightsEl) {
    highlightsEl.innerHTML = pkg.highlights
      .map(
        (h) => `
      <li class="mb-1">
        <i class="bi bi-check-circle-fill text-success me-2"></i>
        <strong>${h.label}:</strong> ${h.value}
      </li>
    `,
      )
      .join("");
  }

  // Meta list (destination, duration, etc.)
  if (metaEl) {
    metaEl.innerHTML = `
      <li style="list-style:none"><i class="bi bi-geo-alt-fill text-danger me-2"></i><strong>Destination:</strong> ${pkg.destination}</li>
      <li style="list-style:none"><i class="bi bi-clock-fill text-primary me-2"></i><strong>Duration:</strong> ${pkg.duration}</li>
      <li style="list-style:none"><i class="bi bi-house-door-fill text-success me-2"></i><strong>Stay:</strong> ${pkg.accommodation}</li>
      <li style="list-style:none"><i class="bi bi-egg-fried text-warning me-2"></i><strong>Meals:</strong> ${pkg.meals}</li>
    `;
  }

  // Show Bootstrap modal
  const modalEl = document.getElementById("packageModal");
  if (!modalEl) return;

  const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
  modalInstance.show();
}
