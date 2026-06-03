(function () {
  var imageDirectory = "assets/images/";
  var cards = Array.prototype.slice.call(document.querySelectorAll(".image-card[data-image]"));
  var lightbox = document.querySelector("[data-lightbox]");
  var lightboxPanel = lightbox ? lightbox.querySelector(".lightbox-panel") : null;
  var lightboxMedia = lightbox ? lightbox.querySelector(".lightbox-media") : null;
  var lightboxImage = lightbox ? lightbox.querySelector("[data-lightbox-image]") : null;
  var lightboxTitle = lightbox ? lightbox.querySelector("[data-lightbox-title]") : null;
  var lightboxCaption = lightbox ? lightbox.querySelector("[data-lightbox-caption]") : null;
  var lightboxKind = lightbox ? lightbox.querySelector("[data-lightbox-kind]") : null;
  var lightboxPath = lightbox ? lightbox.querySelector("[data-lightbox-path]") : null;
  var closeButton = lightbox ? lightbox.querySelector("[data-lightbox-close]") : null;
  var heroPanel = document.querySelector("[data-hero-image]");
  var lastFocusedElement = null;

  function getImagePath(card) {
    return imageDirectory + card.dataset.image;
  }

  function loadCardImage(card) {
    var path = getImagePath(card);
    var displayImage = card.querySelector("img");
    var probe = new Image();

    card.dataset.loaded = "false";

    probe.onload = function () {
      displayImage.src = path;
      displayImage.alt = card.dataset.title || card.dataset.kind || "";
      displayImage.removeAttribute("aria-hidden");
      card.classList.add("is-loaded");
      card.classList.remove("is-missing");
      card.dataset.loaded = "true";
    };

    probe.onerror = function () {
      displayImage.removeAttribute("src");
      displayImage.setAttribute("aria-hidden", "true");
      card.classList.add("is-missing");
      card.classList.remove("is-loaded");
      card.dataset.loaded = "false";
    };

    probe.src = path;
  }

  function openLightbox(card) {
    if (!lightbox) {
      return;
    }

    var path = getImagePath(card);
    var hasImage = card.dataset.loaded === "true";
    lastFocusedElement = document.activeElement;

    lightboxTitle.textContent = card.dataset.title || "Portfolio image";
    lightboxCaption.textContent = card.dataset.caption || "";
    lightboxKind.textContent = card.dataset.kind || "Portfolio image";
    lightboxPath.textContent = "Save as " + path;

    if (hasImage) {
      lightboxImage.src = path;
      lightboxImage.alt = card.dataset.title || card.dataset.kind || "";
      lightboxMedia.classList.add("has-image");
    } else {
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
      lightboxMedia.classList.remove("has-image");
    }

    lightbox.hidden = false;
    document.body.classList.add("has-open-lightbox");
    closeButton.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) {
      return;
    }

    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    document.body.classList.remove("has-open-lightbox");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  cards.forEach(function (card) {
    loadCardImage(card);
    card.addEventListener("click", function () {
      openLightbox(card);
    });
  });

  if (heroPanel) {
    var heroPath = imageDirectory + heroPanel.dataset.heroImage;
    var heroImage = heroPanel.querySelector("img");
    var heroProbe = new Image();

    heroProbe.onload = function () {
      heroImage.src = heroPath;
      heroPanel.classList.add("is-loaded");
    };

    heroProbe.onerror = function () {
      heroImage.removeAttribute("src");
      heroPanel.classList.remove("is-loaded");
    };

    heroProbe.src = heroPath;
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "Tab" && lightbox && !lightbox.hidden && lightboxPanel) {
      var focusable = Array.prototype.slice.call(
        lightboxPanel.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
      ).filter(function (element) {
        return !element.disabled && element.offsetParent !== null;
      });

      if (!focusable.length) {
        return;
      }

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
