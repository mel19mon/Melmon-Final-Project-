const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const replaceMissingImage = (image) => {
  if (!image.isConnected) {
    return;
  }

  const placeholder = document.createElement("div");
  placeholder.className = "image-missing";
  placeholder.textContent =
    image.getAttribute("src") === "assets/Aaron&Me.JPEG"
      ? "Personal photo"
      : "Image preview unavailable";
  image.replaceWith(placeholder);
};

document.querySelectorAll(".photo-card img").forEach((image) => {
  if (image.complete && image.naturalWidth === 0) {
    replaceMissingImage(image);
    return;
  }

  image.addEventListener("error", () => {
    replaceMissingImage(image);
  });
});
