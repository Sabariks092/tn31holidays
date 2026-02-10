// Make sure Bootstrap JS (bundle) is loaded before this file.

// ===== PACKAGE DATA =====
const packages = [
  {
    id: 1,
    title: "TEMPLE TRAIL TAMIL NADU",
    tag: "Spiritual Journey",
    destination: "Madurai, Rameshwaram, Kanyakumari",
    duration: "5 Days / 4 Nights",
    accommodation: "3-star hotels",
    meals: "All meals included",
    price: "RS. 12,999 ONLY",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    subtitle: "Explore the spiritual heart of Tamil Nadu",
    highlights: [
      { label: "Duration", value: "5D / 4N" },
      { label: "Temples", value: "10+ Sacred Sites" },
      { label: "Meals", value: "All Included" },
      { label: "Transport", value: "AC Vehicle" },
    ],
  },
  {
    id: 2,
    title: "HILL STATION RETREAT",
    tag: "Nature Escape",
    destination: "Ooty, Coonoor, Kotagiri",
    duration: "4 Days / 3 Nights",
    accommodation: "Premium resorts",
    meals: "Breakfast included",
    price: "RS. 15,999 ONLY",
    image:
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=80",
    subtitle: "Experience the Queen of Hill Stations",
    highlights: [
      { label: "Duration", value: "4D / 3N" },
      { label: "Altitude", value: "2,240m Peak" },
      { label: "Climate", value: "Cool & Pleasant" },
      { label: "Activities", value: "Nature Walks" },
    ],
  },
  {
    id: 3,
    title: "COASTAL PARADISE",
    tag: "Beach Bliss",
    destination: "Mahabalipuram, Pondicherry",
    duration: "3 Days / 2 Nights",
    accommodation: "Beach resorts",
    meals: "Breakfast & Dinner",
    price: "RS. 9,999 ONLY",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
    subtitle: "Sun, sand, and heritage by the Bay of Bengal",
    highlights: [
      { label: "Duration", value: "3D / 2N" },
      { label: "Beaches", value: "5+ Pristine" },
      { label: "UNESCO Sites", value: "Shore Temple" },
      { label: "Cuisine", value: "French & Tamil" },
    ],
  },
  {
    id: 4,
    title: "WILDLIFE EXPLORER",
    tag: "Adventure Safari",
    destination: "Mudumalai, Bandipur",
    duration: "3 Days / 2 Nights",
    accommodation: "Forest lodges",
    meals: "All meals included",
    price: "RS. 11,999 ONLY",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    subtitle: "Encounter the wild side of Tamil Nadu",
    highlights: [
      { label: "Duration", value: "3D / 2N" },
      { label: "Safaris", value: "4 Game Drives" },
      { label: "Wildlife", value: "Elephants, Tigers" },
      { label: "Birds", value: "200+ Species" },
    ],
  },
  {
    id: 5,
    title: "HERITAGE & CULTURE TRAIL",
    tag: "Heritage Walk",
    destination: "Thanjavur, Trichy, Kumbakonam",
    duration: "4 Days / 3 Nights",
    accommodation: "Boutique stays",
    meals: "Breakfast & Dinner",
    price: "RS. 10,999 ONLY",
    image:
      "https://images.unsplash.com/photo-1524492514791-6773f22686ab?w=800&q=80",
    subtitle: "Dive deep into Tamil Nadu’s rich heritage",
    highlights: [
      { label: "UNESCO Temples", value: "3+" },
      { label: "Cultural Shows", value: "Traditional Arts" },
      { label: "Cuisine", value: "Authentic Tamil Meals" },
      { label: "Guided Tours", value: "Local Experts" },
    ],
  },
  {
    id: 6,
    title: "FAMILY FUN TAMIL NADU",
    tag: "Family Special",
    destination: "Chennai, Mahabalipuram, Pondicherry",
    duration: "5 Days / 4 Nights",
    accommodation: "Family-friendly hotels",
    meals: "Breakfast included",
    price: "RS. 13,499 ONLY",
    image:
      "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=800&q=80",
    subtitle: "Perfect mix of fun, learning and relaxation",
    highlights: [
      { label: "Kid-friendly", value: "Activities & Play" },
      { label: "Beaches", value: "Safe & Clean" },
      { label: "Attractions", value: "Museums & Parks" },
      { label: "Pace", value: "Relaxed Itinerary" },
    ],
  },
  {
    id: 7,
    title: "WEEKEND GETAWAY",
    tag: "Short Break",
    destination: "Yelagiri / Yercaud (Seasonal)",
    duration: "2 Days / 1 Night",
    accommodation: "Comfort stays",
    meals: "Breakfast included",
    price: "RS. 7,999 ONLY",
    image:
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=800&q=80",
    subtitle: "Quick escape to the hills to recharge",
    highlights: [
      { label: "Duration", value: "2D / 1N" },
      { label: "Drive Time", value: "4–6 hrs from Chennai" },
      { label: "Activities", value: "Trekking / Boating" },
      { label: "Best For", value: "Couples & Friends" },
    ],
  },
  {
    id: 8,
    title: "FULL TAMIL NADU CIRCUIT",
    tag: "Grand Tour",
    destination: "Chennai, Madurai, Rameshwaram, Kanyakumari, Ooty",
    duration: "10 Days / 9 Nights",
    accommodation: "Mixed — city & hill stays",
    meals: "Breakfast included",
    price: "RS. 24,999 ONLY",
    image:
      "https://images.unsplash.com/photo-1541417904950-b855846fe074?w=800&q=80",
    subtitle: "One grand circuit covering iconic TN destinations",
    highlights: [
      { label: "Major Cities", value: "5+" },
      { label: "Experiences", value: "Temple, Beach, Hills" },
      { label: "Ideal For", value: "Families & Groups" },
      { label: "Customisation", value: "Highly Flexible" },
    ],
  },
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
      <li><i class="bi bi-geo-alt-fill text-danger me-2"></i><strong>Destination:</strong> ${pkg.destination}</li>
      <li><i class="bi bi-clock-fill text-primary me-2"></i><strong>Duration:</strong> ${pkg.duration}</li>
      <li><i class="bi bi-house-door-fill text-success me-2"></i><strong>Stay:</strong> ${pkg.accommodation}</li>
      <li><i class="bi bi-egg-fried text-warning me-2"></i><strong>Meals:</strong> ${pkg.meals}</li>
    `;
  }

  // Show Bootstrap modal
  const modalEl = document.getElementById("packageModal");
  if (!modalEl) return;

  const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
  modalInstance.show();
}
