let currentImgIndex = 0;
let images = document.querySelectorAll('.gallery-item img');

// Lightbox functions
function openLightbox(img) {
  document.getElementById('lightbox').style.display = "block";
  document.getElementById('lightbox-img').src = img.src;
  currentImgIndex = Array.from(images).indexOf(img);
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = "none";
}

function changeImage(n) {
  currentImgIndex += n;
  if(currentImgIndex < 0) currentImgIndex = images.length - 1;
  if(currentImgIndex >= images.length) currentImgIndex = 0;
  document.getElementById('lightbox-img').src = images[currentImgIndex].src;
}

// Filter Images
function filterImages(category) {
  images.forEach(img => {
    let item = img.parentElement;
    if(category === 'all' || item.classList.contains(category)){
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
