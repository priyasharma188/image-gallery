let currentImgIndex = 0;
let visibleImages = [];

// Collect ALL images once
const allImages = Array.from(document.querySelectorAll(".gallery-item img"));

// Update visible images list (only non-hidden items)
function updateVisibleImages() {
  visibleImages = allImages.filter(
    (img) => img.parentElement.style.display !== "none",
  );
}

// Open lightbox
function openLightbox(img) {
  updateVisibleImages();
  currentImgIndex = visibleImages.indexOf(img);

  const lightbox = document.getElementById("lightbox");
  document.getElementById("lightbox-img").src = img.src;
  lightbox.classList.add("open");

  updateCounter();
}

// Close lightbox
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

// Navigate prev/next — only within visible images
function changeImage(n) {
  currentImgIndex += n;
  if (currentImgIndex < 0) currentImgIndex = visibleImages.length - 1;
  if (currentImgIndex >= visibleImages.length) currentImgIndex = 0;

  document.getElementById("lightbox-img").src =
    visibleImages[currentImgIndex].src;
  updateCounter();
}

// Show image number
function updateCounter() {
  const counter = document.getElementById("lightbox-counter");
  if (counter) {
    counter.textContent = currentImgIndex + 1 + " / " + visibleImages.length;
  }
}

// Filter images by category
function filterImages(category) {
  // Update active button style
  document.querySelectorAll(".filter-buttons button").forEach((btn) => {
    btn.classList.remove("active");
    if (
      btn.textContent.toLowerCase() === category ||
      (category === "all" && btn.textContent.toLowerCase() === "all")
    ) {
      btn.classList.add("active");
    }
  });

  allImages.forEach((img) => {
    const item = img.parentElement;
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });

  updateVisibleImages();
}

// Keyboard support: ESC to close, arrow keys to navigate
document.addEventListener("keydown", function (e) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox.classList.contains("open")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") changeImage(1);
  if (e.key === "ArrowLeft") changeImage(-1);
});

// Click outside image to close
document.getElementById("lightbox").addEventListener("click", function (e) {
  if (e.target === this) closeLightbox();
});

// Set "All" button as active on page load
window.addEventListener("DOMContentLoaded", function () {
  updateVisibleImages();
  const allBtn = document.querySelector(".filter-buttons button");
  if (allBtn) allBtn.classList.add("active");
});
