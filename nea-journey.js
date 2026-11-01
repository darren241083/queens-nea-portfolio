(function () {
  var page = document.querySelector(".nea-journey-page");

  if (!page) {
    return;
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var announcer = document.querySelector("[data-journey-announcer]");
  var siteNav = document.querySelector(".site-nav");
  var bar = document.querySelector("[data-journey-bar]");
  var minimap = document.querySelector("[data-minimap]");
  var barStatus = document.querySelector("[data-journey-status]");
  var modeToggle = document.querySelector("[data-mode-toggle]");
  var presentControls = document.querySelector("[data-present-controls]");
  var presentPrev = document.querySelector("[data-present-prev]");
  var presentNext = document.querySelector("[data-present-next]");
  var presentExit = document.querySelector("[data-present-exit]");
  var presentCount = document.querySelector("[data-present-count]");
  var presentTitle = document.querySelector("[data-present-title]");
  var slides = toArray(document.querySelectorAll("[data-slide]"));
  var nodes = toArray(document.querySelectorAll("[data-node]"));
  var currentIndex = -1;
  var presenting = false;
  var spyQueued = false;

  function toArray(list) {
    return Array.prototype.slice.call(list);
  }

  function scrollBehaviour() {
    return reduceMotion.matches ? "auto" : "smooth";
  }

  function announce(message) {
    if (!announcer) {
      return;
    }

    announcer.textContent = "";
    window.setTimeout(function () {
      announcer.textContent = message;
    }, 60);
  }

  function replay(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
  }

  /* Disclosures: "see the example" and similar reveal buttons. */
  toArray(document.querySelectorAll("[data-disclosure]")).forEach(function (button) {
    var panel = document.getElementById(button.getAttribute("aria-controls"));

    if (!panel) {
      return;
    }

    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;

      if (open) {
        replay(panel, "is-arriving");
      }
    });
  });

  /* Flip switches: weak version on the front, strong version on the back. */
  toArray(document.querySelectorAll("[data-flip]")).forEach(function (flip) {
    var toggle = flip.querySelector("[data-flip-switch]");
    var fronts = toArray(flip.querySelectorAll("[data-flip-front]"));
    var backs = toArray(flip.querySelectorAll("[data-flip-back]"));

    if (!toggle) {
      return;
    }

    toggle.addEventListener("click", function () {
      var flipped = toggle.getAttribute("aria-checked") !== "true";
      toggle.setAttribute("aria-checked", String(flipped));
      flip.classList.toggle("is-flipped", flipped);

      fronts.forEach(function (face) {
        face.hidden = flipped;
      });

      backs.forEach(function (face) {
        face.hidden = !flipped;
      });

      (flipped ? backs : fronts).forEach(function (face) {
        replay(face, "is-flipping");
      });
    });
  });

  /* Tabs, including the iterative loop diagram. Arrow keys wrap, like the loop. */
  toArray(document.querySelectorAll("[role='tablist']")).forEach(function (tablist) {
    var tabs = toArray(tablist.querySelectorAll("[role='tab']"));
    var loop = tablist.closest("[data-loop]");

    function select(tab, moveFocus) {
      tabs.forEach(function (candidate) {
        var selected = candidate === tab;
        var panel = document.getElementById(candidate.getAttribute("aria-controls"));

        candidate.setAttribute("aria-selected", String(selected));
        candidate.tabIndex = selected ? 0 : -1;

        if (panel) {
          panel.hidden = !selected;

          if (selected) {
            replay(panel, "is-arriving");
          }
        }
      });

      if (loop) {
        loop.setAttribute("data-active", String(tabs.indexOf(tab)));
      }

      if (moveFocus) {
        tab.focus();
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        select(tab, false);
      });

      tab.addEventListener("keydown", function (event) {
        var next = null;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          next = tabs[(index + 1) % tabs.length];
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          next = tabs[(index - 1 + tabs.length) % tabs.length];
        } else if (event.key === "Home") {
          next = tabs[0];
        } else if (event.key === "End") {
          next = tabs[tabs.length - 1];
        }

        if (next) {
          event.preventDefault();
          select(next, true);
        }
      });
    });
  });

  toArray(document.querySelectorAll("[data-tab-go]")).forEach(function (button) {
    button.addEventListener("click", function () {
      var tab = document.getElementById(button.getAttribute("data-tab-go"));

      if (tab) {
        tab.click();
        tab.focus();
      }
    });
  });

  /* Steppers: reveal a worked example one step at a time. */
  toArray(document.querySelectorAll("[data-stepper]")).forEach(function (stepper) {
    var steps = toArray(stepper.querySelectorAll("[data-step]"));
    var prev = stepper.querySelector("[data-stepper-prev]");
    var next = stepper.querySelector("[data-stepper-next]");
    var all = stepper.querySelector("[data-stepper-all]");
    var status = stepper.querySelector("[data-stepper-status]");
    var after = stepper.querySelector("[data-stepper-after]");
    var nextLabel = next.querySelector("span");
    var nextText = nextLabel.textContent;
    var unit = stepper.getAttribute("data-stepper-unit") || "Step";
    var index = 0;

    function render(speak) {
      var last = index === steps.length - 1;
      var current = steps[index];
      var body = current.querySelector("[data-step-body]");

      steps.forEach(function (step, i) {
        var revealed = i <= index;
        var stepBody = step.querySelector("[data-step-body]");

        step.classList.toggle("is-revealed", revealed);
        step.classList.toggle("is-current", i === index);
        step.classList.toggle("is-pending", !revealed);

        if (stepBody) {
          stepBody.hidden = !revealed;
        }
      });

      replay(current, "is-arriving");
      prev.disabled = index === 0;
      nextLabel.textContent = last ? "Start again" : nextText;

      if (all) {
        all.disabled = last;
      }

      if (after) {
        after.hidden = !last;
      }

      status.textContent = unit + " " + (index + 1) + " of " + steps.length;

      if (speak) {
        announce(
          unit + " " + (index + 1) + " of " + steps.length + ", " +
          current.getAttribute("data-step-title") + ": " +
          (body ? body.textContent.replace(/\s+/g, " ").trim() : "") +
          (last && after ? " " + after.textContent.replace(/\s+/g, " ").trim() : "")
        );
      }
    }

    prev.addEventListener("click", function () {
      if (index > 0) {
        index -= 1;
        render(true);
      }

      if (prev.disabled) {
        next.focus();
      }
    });

    next.addEventListener("click", function () {
      index = index === steps.length - 1 ? 0 : index + 1;
      render(true);
    });

    if (all) {
      all.addEventListener("click", function () {
        index = steps.length - 1;
        render(true);
        next.focus();
      });
    }

    render(false);
  });

  /* Click-to-copy sentence starters. */
  function legacyCopy(text, returnFocus) {
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      var copied = false;

      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "0";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();

      try {
        copied = document.execCommand("copy");
      } catch (error) {
        copied = false;
      }

      document.body.removeChild(area);

      if (returnFocus) {
        returnFocus.focus();
      }

      if (copied) {
        resolve();
      } else {
        reject();
      }
    });
  }

  function copyText(text, returnFocus) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        return legacyCopy(text, returnFocus);
      });
    }

    return legacyCopy(text, returnFocus);
  }

  toArray(document.querySelectorAll("[data-copy]")).forEach(function (button) {
    var status = button.querySelector("[data-copy-status]");
    var idleText = status ? status.textContent : "";
    var timer = null;

    function setState(label, className) {
      button.classList.remove("is-copied", "is-copy-failed");
      button.classList.add(className);

      if (status) {
        status.textContent = label;
      }

      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        button.classList.remove(className);

        if (status) {
          status.textContent = idleText;
        }
      }, 2600);
    }

    button.addEventListener("click", function () {
      copyText(button.getAttribute("data-copy"), button).then(function () {
        setState("Copied", "is-copied");
        announce("Sentence starter copied to the clipboard.");
      }, function () {
        setState("Copy blocked - write it down", "is-copy-failed");
        announce("Copying was blocked by the browser. The sentence starter is shown on the button.");
      });
    });
  });

  /* Stage map + scrollspy. */
  nodes.forEach(function (node) {
    var target = document.getElementById(node.getAttribute("href").slice(1));
    var slide = target ? target.closest("[data-slide]") : null;
    node.setAttribute("data-slide-index", String(slides.indexOf(slide)));
  });

  function updateOffsets() {
    var navHeight = siteNav && getComputedStyle(siteNav).position === "sticky" ? siteNav.offsetHeight : 0;
    var barHeight = bar && getComputedStyle(bar).position === "sticky" ? bar.offsetHeight : 0;

    page.style.setProperty("--journey-bar-top", navHeight + "px");
    page.style.setProperty("--journey-offset", navHeight + barHeight + "px");
  }

  function centreMinimap() {
    if (!minimap || minimap.scrollWidth <= minimap.clientWidth) {
      return;
    }

    var active = minimap.querySelector(".is-active");

    if (active) {
      minimap.scrollTo({
        left: active.offsetLeft - minimap.clientWidth / 2 + active.offsetWidth / 2,
        behavior: scrollBehaviour()
      });
    }
  }

  function setActive(index) {
    var slide = slides[index];
    var extra = (slide.getAttribute("data-spy") || "").split(" ");

    currentIndex = index;

    nodes.forEach(function (node) {
      var slideIndex = Number(node.getAttribute("data-slide-index"));
      var active = slideIndex === index || extra.indexOf(node.getAttribute("data-node")) !== -1;

      node.classList.toggle("is-active", active);
      node.classList.toggle("is-passed", !active && slideIndex < index);

      if (active) {
        node.setAttribute("aria-current", "location");
      } else {
        node.removeAttribute("aria-current");
      }
    });

    if (barStatus) {
      barStatus.textContent = slide.getAttribute("data-title");
    }

    centreMinimap();
  }

  function slideIndexAtLine() {
    var offset = parseFloat(page.style.getPropertyValue("--journey-offset")) || 0;
    var line = offset + (window.innerHeight - offset) * 0.3;
    var index = 0;

    slides.forEach(function (slide, i) {
      if (slide.getBoundingClientRect().top <= line) {
        index = i;
      }
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      index = slides.length - 1;
    }

    return index;
  }

  function spy() {
    spyQueued = false;

    if (presenting) {
      return;
    }

    var index = slideIndexAtLine();

    if (index !== currentIndex) {
      setActive(index);
    }
  }

  window.addEventListener("scroll", function () {
    if (!spyQueued) {
      spyQueued = true;
      window.setTimeout(spy, 60);
    }
  }, { passive: true });

  window.addEventListener("resize", function () {
    updateOffsets();
    spy();
  });

  /* Present mode: one section at a time, larger type. */
  function updateUrl(id) {
    var query = presenting ? "?mode=present" : "";
    history.replaceState(null, "", window.location.pathname + query + "#" + id);
  }

  function focusHeading(slide) {
    var heading = slide.querySelector("h1[tabindex], h2[tabindex]");

    if (heading) {
      heading.focus({ preventScroll: true });
    }
  }

  function showSlide(index, moveFocus) {
    index = Math.max(0, Math.min(slides.length - 1, index));

    slides.forEach(function (slide, i) {
      slide.classList.toggle("is-slide-hidden", i !== index);
    });

    setActive(index);
    replay(slides[index], "is-arriving");
    window.scrollTo(0, 0);

    presentCount.textContent = (index + 1) + " / " + slides.length;
    presentTitle.textContent = slides[index].getAttribute("data-title");
    presentPrev.disabled = index === 0;
    presentNext.disabled = index === slides.length - 1;

    if (moveFocus) {
      focusHeading(slides[index]);
    }

    updateUrl(slides[index].id);
  }

  function step(delta, moveFocus) {
    var target = Math.max(0, Math.min(slides.length - 1, currentIndex + delta));

    if (target === currentIndex) {
      return;
    }

    showSlide(target, moveFocus);

    if (!moveFocus) {
      announce(slides[target].getAttribute("data-title"));
    }
  }

  function setMode(on) {
    presenting = on;
    page.classList.toggle("is-presenting", on);
    modeToggle.setAttribute("aria-pressed", String(on));
    presentControls.hidden = !on;
    updateOffsets();

    if (on) {
      showSlide(currentIndex < 0 ? 0 : currentIndex, false);
      announce("Present mode on. One section at a time. Use the arrow keys, or the Previous and Next buttons at the bottom of the screen.");
      return;
    }

    slides.forEach(function (slide) {
      slide.classList.remove("is-slide-hidden");
    });

    updateUrl(slides[currentIndex].id);
    slides[currentIndex].scrollIntoView({ block: "start", behavior: "auto" });
    announce("Browse mode on. Every section is on one scrolling page.");
  }

  modeToggle.addEventListener("click", function () {
    setMode(!presenting);
  });

  presentPrev.addEventListener("click", function () {
    step(-1, false);

    if (presentPrev.disabled) {
      presentNext.focus();
    }
  });

  presentNext.addEventListener("click", function () {
    step(1, false);

    if (presentNext.disabled) {
      presentPrev.focus();
    }
  });

  presentExit.addEventListener("click", function () {
    setMode(false);
    modeToggle.focus();
  });

  document.addEventListener("click", function (event) {
    var link = event.target.closest ? event.target.closest("a[href^='#']") : null;
    var target;
    var slide;

    if (!presenting || !link) {
      return;
    }

    target = document.getElementById(link.getAttribute("href").slice(1));
    slide = target ? target.closest("[data-slide]") : null;

    if (!slide) {
      return;
    }

    event.preventDefault();
    showSlide(slides.indexOf(slide), true);

    if (target !== slide) {
      target.scrollIntoView({ block: "start", behavior: "auto" });
    }
  });

  /* Capture phase, so an open image lightbox is seen before script.js closes it on Escape. */
  document.addEventListener("keydown", function (event) {
    var target = event.target;

    if (!presenting || event.altKey || event.ctrlKey || event.metaKey || document.body.classList.contains("has-open-lightbox")) {
      return;
    }

    if (target.closest && target.closest("input, textarea, select, [contenteditable='true'], [role='tablist']")) {
      return;
    }

    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      step(1, true);
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      step(-1, true);
    } else if (event.key === "Escape") {
      setMode(false);
      modeToggle.focus();
    }
  }, true);

  /* Initial state. */
  updateOffsets();

  (function init() {
    var hashTarget = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    var hashSlide = hashTarget ? hashTarget.closest("[data-slide]") : null;
    var wantsPresent = /(?:^|[?&])mode=present(?:&|$)/.test(window.location.search);

    setActive(hashSlide ? slides.indexOf(hashSlide) : slideIndexAtLine());

    if (wantsPresent) {
      setMode(true);

      if (hashTarget && hashTarget !== hashSlide) {
        hashTarget.scrollIntoView({ block: "start", behavior: "auto" });
      }
    }
  })();
})();
