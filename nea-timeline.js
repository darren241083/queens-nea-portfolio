(function () {
  /* ============================================================
     NEA TIMELINE — SHARED CONFIG
     This one file drives BOTH the full timeline on nea-timeline.html
     and the compact strip on the other NEA pages, so they can never
     disagree. Everything you need to edit is in CONFIG below.
     Dates are ISO: "YYYY-MM-DD". Blank link ("") = "Coming soon".
     ============================================================ */

  var CONFIG = {
    /* Page the compact strip links to */
    timelinePage: "nea-timeline.html",

    /* The window the timeline draws */
    range: {
      start: "2026-11-02",
      end: "2027-02-12"
    },

    /* ----------------------------------------------------------
       STAGES  (sized on the timeline by number of school days)
       section  : D, E or F — sets the colour band
       short    : label drawn on the block
       link     : page the block opens ("" = Coming soon)
       resources: cards shown in the panel while this stage is current.
                  { title, note, link, image } — image is optional.
       ---------------------------------------------------------- */
    stages: [
      {
        id: "development",
        name: "Development",
        short: "Development",
        section: "D",
        start: "2026-11-02",
        end: "2026-11-27",
        link: "nea-journey.html#stage-loop",
        resources: [
          {
            title: "The iterative loop",
            note: "Idea, evaluate, question, research, next idea — stepped through in a real folder.",
            link: "nea-journey.html#stage-loop",
            image: "assets/images/7-gcse-development-1.png"
          },
          {
            title: "Explain what you left behind",
            note: "Why the ideas you rejected still earn marks.",
            link: "nea-journey.html#left-behind"
          }
        ]
      },
      {
        id: "final-design",
        name: "Final design & working drawings",
        short: "Final design",
        section: "D",
        start: "2026-11-30",
        end: "2026-12-04",
        link: "nea-journey.html#stage-drawings",
        resources: [
          {
            title: "Communicating the final design",
            note: "What the final drawings page has to show before anything is cut.",
            link: "nea-journey.html#stage-drawings"
          },
          {
            title: "Client check-ins",
            note: "Bring the client back in while the design can still change.",
            link: "nea-journey.html#stage-client"
          }
        ]
      },
      {
        id: "making-1",
        name: "Making part 1",
        short: "Making 1",
        section: "E",
        start: "2026-12-07",
        end: "2026-12-16",
        link: "nea-journey.html#stage-manufacturing",
        resources: [
          {
            title: "The manufacturing specification",
            note: "Order of operations, tools and checks, written before you start.",
            link: "nea-journey.html#stage-manufacturing",
            image: "assets/images/8-gcse-development-2.jpg"
          }
        ]
      },
      {
        id: "making-2",
        name: "Making part 2",
        short: "Making 2",
        section: "E",
        start: "2027-01-06",
        end: "2027-02-05",
        link: "nea-journey.html#stage-make",
        resources: [
          {
            title: "Make, test, evaluate",
            note: "What to photograph and record as the prototype comes together.",
            link: "nea-journey.html#stage-make"
          }
        ]
      },
      {
        id: "testing",
        name: "Testing, evaluation & portfolio tidy-up",
        short: "Testing",
        section: "F",
        start: "2027-02-08",
        end: "2027-02-12",
        link: "nea-journey.html#stage-make",
        resources: [
          {
            title: "Closing the loop",
            note: "Test against the specification, then evaluate honestly.",
            link: "nea-journey.html#stage-make"
          },
          {
            title: "Three things every strong folder has",
            note: "The last check before hand-in.",
            link: "nea-journey.html#recap"
          }
        ]
      }
    ],

    /* ----------------------------------------------------------
       DATES  type: "deadline" (large flag) or "checkpoint" (small)
       The next-deadline card shows the nearest item of either type.
       ---------------------------------------------------------- */
    dates: [
      { date: "2026-11-06", label: "Development check-in", type: "checkpoint", section: "D" },
      { date: "2026-11-13", label: "Development check-in", type: "checkpoint", section: "D" },
      { date: "2026-11-20", label: "Development check-in", type: "checkpoint", section: "D" },
      { date: "2026-11-27", label: "Development complete", type: "deadline", section: "D" },
      { date: "2026-12-04", label: "Final design locked", type: "deadline", section: "D" },
      { date: "2026-12-16", label: "Templates and first CAM parts cut", type: "deadline", section: "E" },
      { date: "2027-02-05", label: "Prototype complete", type: "deadline", section: "E" },
      { date: "2027-02-12", label: "NEA hand-in", type: "deadline", section: "F" }
    ],

    /* ----------------------------------------------------------
       HOLIDAYS / NON-TEACHING DAYS
       Drawn as narrow "School closed" blocks and taken out of every
       school-day countdown. Add mock exam weeks here too.
       ---------------------------------------------------------- */
    holidays: [
      {
        name: "Christmas holiday",
        note: "5 Jan is INSET",
        start: "2026-12-17",
        end: "2027-01-05"
      },
      {
        name: "February half term",
        note: "Starts Mon 15 Feb",
        start: "2027-02-15",
        end: "2027-02-19"
      }
      /* Year 11 mocks — add the dates and uncomment:
      { name: "Year 11 mocks", note: "No NEA lessons", start: "", end: "" }
      */
    ],

    /* AQA sections. Leave link as "" to show a disabled "Coming soon". */
    sections: [
      { letter: "A", name: "Identifying & investigating", link: "nea-problem-finding.html" },
      { letter: "B", name: "Brief & specification", link: "nea-journey.html#stage-spec" },
      { letter: "C", name: "Generating design ideas", link: "initial-ideas.html" },
      { letter: "D", name: "Developing design ideas", link: "nea-journey.html#part-3" },
      { letter: "E", name: "Realising design ideas", link: "nea-journey.html#stage-manufacturing" },
      { letter: "F", name: "Analysing & evaluating", link: "nea-journey.html#stage-make" }
    ],

    /* School days left when the next-deadline card changes colour.
       Above amber = neutral. Colour is always paired with words. */
    urgency: {
      amber: 5,
      red: 2
    },

    /* Width of a "School closed" block, in school-day units */
    holidayUnits: 4
  };

  /* ============================================================
     END OF CONFIG — no need to edit below this line
     ============================================================ */

  var DAY = 86400000;

  /* ---------- date helpers ----------
     Every date is handled as a whole day, never a timestamp, so there
     is no UTC/BST off-by-one. "Today" is read in Europe/London. */

  function toDay(iso) {
    var parts = String(iso).split("-");
    return Math.round(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]) / DAY);
  }

  function toDate(day) {
    return new Date(day * DAY);
  }

  function formatDate(day, opts) {
    var options = { timeZone: "UTC" };
    var key;

    for (key in opts) {
      if (Object.prototype.hasOwnProperty.call(opts, key)) {
        options[key] = opts[key];
      }
    }

    return new Intl.DateTimeFormat("en-GB", options).format(toDate(day));
  }

  function longDate(day) {
    return formatDate(day, { weekday: "long", day: "numeric", month: "long" });
  }

  function mediumDate(day) {
    return formatDate(day, { weekday: "short", day: "numeric", month: "short" });
  }

  function isWeekend(day) {
    var weekday = toDate(day).getUTCDay();
    return weekday === 0 || weekday === 6;
  }

  function todayInLondon() {
    var iso;

    try {
      iso = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/London",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date());
    } catch (error) {
      iso = "";
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
      var now = new Date();
      iso =
        now.getFullYear() +
        "-" +
        ("0" + (now.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + now.getDate()).slice(-2);
    }

    return toDay(iso);
  }

  function dateOverride() {
    var value = null;

    try {
      value = new URLSearchParams(window.location.search).get("date");
    } catch (error) {
      value = null;
    }

    return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
  }

  var preview = dateOverride();
  var todayDay = preview ? toDay(preview) : todayInLondon();

  /* ---------- model ---------- */

  var rangeStart = toDay(CONFIG.range.start);
  var rangeEnd = toDay(CONFIG.range.end);

  var holidays = CONFIG.holidays
    .filter(function (holiday) {
      return holiday.start && holiday.end;
    })
    .map(function (holiday) {
      return {
        kind: "holiday",
        name: holiday.name,
        note: holiday.note || "",
        startDay: toDay(holiday.start),
        endDay: toDay(holiday.end)
      };
    });

  function isHoliday(day) {
    return holidays.some(function (holiday) {
      return day >= holiday.startDay && day <= holiday.endDay;
    });
  }

  function isSchoolDay(day) {
    return !isWeekend(day) && !isHoliday(day);
  }

  /* School days in [from, to], inclusive both ends */
  function schoolDaysBetween(from, to) {
    var count = 0;
    var day;

    for (day = from; day <= to; day += 1) {
      if (isSchoolDay(day)) {
        count += 1;
      }
    }

    return count;
  }

  /* School days from tomorrow up to and including the target */
  function schoolDaysUntil(target) {
    return target <= todayDay ? 0 : schoolDaysBetween(todayDay + 1, target);
  }

  function nextSchoolDay(from) {
    var day = from;
    var guard = 0;

    while (!isSchoolDay(day) && guard < 400) {
      day += 1;
      guard += 1;
    }

    return day;
  }

  var stages = CONFIG.stages.map(function (stage, index) {
    var startDay = toDay(stage.start);
    var endDay = toDay(stage.end);

    return {
      kind: "stage",
      index: index,
      data: stage,
      startDay: startDay,
      endDay: endDay,
      schoolDays: schoolDaysBetween(startDay, endDay),
      get state() {
        if (endDay < todayDay) {
          return "past";
        }

        return startDay <= todayDay ? "current" : "future";
      }
    };
  });

  var marks = CONFIG.dates
    .map(function (mark) {
      return {
        data: mark,
        day: toDay(mark.date),
        type: mark.type === "checkpoint" ? "checkpoint" : "deadline"
      };
    })
    .sort(function (a, b) {
      return a.day - b.day;
    });

  /* Blocks drawn on the timeline, in order, clipped to the range */
  var segments = stages
    .concat(holidays)
    .filter(function (item) {
      return item.endDay >= rangeStart && item.startDay <= rangeEnd;
    })
    .sort(function (a, b) {
      return a.startDay - b.startDay;
    });

  segments.forEach(function (segment) {
    segment.units =
      segment.kind === "stage" ? Math.max(1, segment.schoolDays) : CONFIG.holidayUnits;
  });

  /* How far through a block a date sits, 0 to 1.
     atEnd puts a deadline on the closing edge of its day; the today
     marker sits in the middle of its day. */
  function fractionIn(segment, day, atEnd) {
    var steps =
      segment.kind === "stage"
        ? segment.units
        : segment.endDay - segment.startDay + 1;
    var fraction =
      segment.kind === "stage"
        ? schoolDaysBetween(segment.startDay, day) / steps
        : (day - segment.startDay + 1) / steps;

    if (!atEnd) {
      fraction -= 0.5 / steps;
    }

    return Math.max(0, Math.min(1, fraction));
  }

  /* Blocks are flex items, and narrow ones are floored to stay readable,
     so marker positions are measured off the real blocks rather than
     calculated from the units. Recomputed whenever the lane resizes. */
  var laneBlocks = [];

  function pxFor(day, atEnd, laneRect) {
    var index;
    var entry;
    var rect;

    for (index = 0; index < laneBlocks.length; index += 1) {
      entry = laneBlocks[index];
      rect = entry.el.getBoundingClientRect();

      if (day < entry.segment.startDay) {
        return rect.left - laneRect.left;
      }

      if (day <= entry.segment.endDay) {
        return (
          rect.left -
          laneRect.left +
          fractionIn(entry.segment, day, atEnd) * rect.width
        );
      }
    }

    return laneRect.width;
  }

  function positionOverlays(root) {
    var lane = root.querySelector(".nea-tl-lane");

    if (!lane || !laneBlocks.length) {
      return;
    }

    var laneRect = lane.getBoundingClientRect();
    var markers = root.querySelectorAll(".nea-tl-mark");
    var marker = root.querySelector(".nea-tl-today");
    var index;

    for (index = 0; index < markers.length; index += 1) {
      markers[index].style.left =
        pxFor(Number(markers[index].getAttribute("data-day")), true, laneRect) + "px";
    }

    if (marker) {
      marker.style.left =
        (todayDay < rangeStart
          ? 0
          : todayDay > rangeEnd
          ? laneRect.width
          : pxFor(todayDay, false, laneRect)) + "px";
    }
  }

  /* ---------- current state ---------- */

  function stageOn(day) {
    var found = null;

    stages.forEach(function (stage) {
      if (!found && day >= stage.startDay && day <= stage.endDay) {
        found = stage;
      }
    });

    return found;
  }

  function stageAfter(day) {
    var found = null;

    stages.forEach(function (stage) {
      if (!found && stage.startDay > day) {
        found = stage;
      }
    });

    return found;
  }

  function holidayOn(day) {
    var found = null;

    holidays.forEach(function (holiday) {
      if (!found && day >= holiday.startDay && day <= holiday.endDay) {
        found = holiday;
      }
    });

    return found;
  }

  function stageForDay(day) {
    return stageOn(day) || stageAfter(day) || stages[stages.length - 1];
  }

  var nextMark = (function () {
    var found = null;

    marks.forEach(function (mark) {
      if (!found && mark.day >= todayDay) {
        found = mark;
      }
    });

    return found;
  })();

  var state = (function () {
    if (todayDay < rangeStart) {
      return "before";
    }

    if (todayDay > rangeEnd) {
      return "after";
    }

    return isSchoolDay(todayDay) && stageOn(todayDay) ? "open" : "closed";
  })();

  var currentStage = stageOn(todayDay);
  var lessonDay = state === "closed" ? nextSchoolDay(todayDay) : todayDay;
  var lessonStage = stageForDay(lessonDay);

  /* The stage whose words the panel shows */
  var panelStage =
    state === "before" ? stages[0] : state === "after" ? null : currentStage || lessonStage;

  var currentSection = panelStage ? panelStage.data.section : null;

  /* ---------- urgency ---------- */

  function urgencyFor(mark) {
    if (!mark) {
      return "none";
    }

    var days = schoolDaysUntil(mark.day);

    if (mark.day === todayDay) {
      return "today";
    }

    if (days <= CONFIG.urgency.red) {
      return "red";
    }

    if (days <= CONFIG.urgency.amber) {
      return "amber";
    }

    return "neutral";
  }

  function markTypeLabel(mark) {
    return mark.type === "checkpoint" ? "Check-in" : "Deadline";
  }

  function stageForMark(mark) {
    return stageOn(mark.day) || stageForDay(mark.day);
  }

  /* ---------- small DOM helpers ---------- */

  function element(tag, className, text) {
    var node = document.createElement(tag);

    if (className) {
      node.className = className;
    }

    if (text !== undefined && text !== null) {
      node.textContent = text;
    }

    return node;
  }

  function icon(name) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "nea-tl-icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    if (name === "arrow") {
      path.setAttribute("d", "M5 12h13M12 6l6 6-6 6");
    } else if (name === "today") {
      path.setAttribute(
        "d",
        "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM12 7.5v5M12 16.2h.01"
      );
    } else if (name === "warn") {
      path.setAttribute("d", "M12 4 22 20H2L12 4zM12 10v4M12 17h.01");
    } else {
      path.setAttribute("d", "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z");
    }

    svg.appendChild(path);

    return svg;
  }

  function urgencyIcon(level) {
    return icon(level === "today" ? "today" : level === "neutral" ? "clock" : "warn");
  }

  /* Keeps the ?date= preview when moving between pages */
  function withPreview(href) {
    if (!preview || !href) {
      return href;
    }

    return href + (href.indexOf("?") === -1 ? "?" : "&") + "date=" + preview;
  }

  /* ---------- the panel (shared wording, used by the full page) ---------- */

  function buildPanel() {
    var panel = element("div", "nea-tl-panel");
    var main = element("div", "nea-tl-panel-main");
    var side = element("div", "nea-tl-panel-side");

    main.appendChild(
      element(
        "p",
        "nea-tl-kicker",
        state === "after" ? "After hand-in" : "Today · " + longDate(todayDay)
      )
    );

    if (state === "after") {
      main.appendChild(element("h2", "nea-tl-panel-title", "NEA complete"));
      main.appendChild(
        element(
          "p",
          "nea-tl-note",
          "Handed in on " +
            longDate(toDay(CONFIG.dates[CONFIG.dates.length - 1].date)) +
            ". The section links below still work."
        )
      );
    } else if (state === "before") {
      main.appendChild(
        element(
          "h2",
          "nea-tl-panel-title",
          stages[0].data.name + " starts " + mediumDate(rangeStart)
        )
      );
      main.appendChild(
        element(
          "p",
          "nea-tl-panel-meta",
          "Section " +
            stages[0].data.section +
            " · " +
            mediumDate(stages[0].startDay) +
            " – " +
            mediumDate(stages[0].endDay)
        )
      );
    } else if (state === "closed") {
      var closed = holidayOn(todayDay);

      main.appendChild(element("h2", "nea-tl-panel-title", "School closed"));
      main.appendChild(
        element(
          "p",
          "nea-tl-next-lesson",
          (closed ? closed.name + " — next" : "Next") +
            " lesson " +
            longDate(lessonDay) +
            ": " +
            lessonStage.data.name
        )
      );
    } else {
      main.appendChild(element("h2", "nea-tl-panel-title", currentStage.data.name));
      main.appendChild(
        element(
          "p",
          "nea-tl-panel-meta",
          "Section " +
            currentStage.data.section +
            " · " +
            mediumDate(currentStage.startDay) +
            " – " +
            mediumDate(currentStage.endDay)
        )
      );
    }

    side.appendChild(buildResources());
    panel.appendChild(main);
    panel.appendChild(side);

    return panel;
  }

  /* ---------- resources, swapped as the stage changes ---------- */

  function buildResources() {
    var stage = panelStage || stages[stages.length - 1];
    var list = (stage.data.resources || []).slice(0, 3);
    var wrap = element("div", "nea-tl-resources");

    wrap.appendChild(
      element(
        "p",
        "nea-tl-kicker",
        state === "after" ? "Worth another look" : "Resources for this stage"
      )
    );

    if (!list.length) {
      list = [
        {
          title: stage.data.name,
          note: "Open the resources for this stage.",
          link: stage.data.link
        }
      ];
    }

    list.forEach(function (resource) {
      var card = element("a", "nea-tl-res");
      card.href = withPreview(resource.link || CONFIG.timelinePage);

      if (resource.image) {
        var frame = element("span", "nea-tl-res-thumb");
        var img = document.createElement("img");

        img.src = resource.image;
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        img.addEventListener("error", function () {
          frame.remove();
        });

        frame.appendChild(img);
        card.appendChild(frame);
      }

      var body = element("span", "nea-tl-res-body");
      body.appendChild(element("span", "nea-tl-res-title", resource.title));

      if (resource.note) {
        body.appendChild(element("span", "nea-tl-res-note", resource.note));
      }

      var cta = element("span", "nea-tl-res-cta");
      cta.appendChild(element("span", null, "Open"));
      cta.appendChild(icon("arrow"));
      body.appendChild(cta);

      card.appendChild(body);
      wrap.appendChild(card);
    });

    return wrap;
  }

  /* ---------- section A–F links ---------- */

  function buildSections() {
    var wrap = element("nav", "nea-tl-sections");
    wrap.setAttribute("aria-label", "AQA sections A to F");

    var list = element("ul", "nea-tl-sections-list");

    CONFIG.sections.forEach(function (section) {
      var item = element("li");
      var node;

      if (section.link) {
        node = element("a", "nea-tl-section");
        node.href = withPreview(section.link);
      } else {
        node = element("span", "nea-tl-section is-disabled");
        node.setAttribute("aria-disabled", "true");
      }

      node.setAttribute("data-section", section.letter);

      if (section.letter === currentSection) {
        node.setAttribute("aria-current", "true");
      }

      node.appendChild(element("span", "nea-tl-section-letter", section.letter));

      var body = element("span", "nea-tl-section-body");
      body.appendChild(element("span", "nea-tl-section-name", section.name));

      if (!section.link) {
        body.appendChild(element("span", "nea-tl-section-soon", "Coming soon"));
      } else if (section.letter === currentSection) {
        body.appendChild(element("span", "nea-tl-section-now", "You are here"));
      }

      node.appendChild(body);
      item.appendChild(node);
      list.appendChild(item);
    });

    wrap.appendChild(list);

    return wrap;
  }

  /* ---------- horizontal timeline ---------- */

  function stageBlock(segment) {
    var block = element("a", "nea-tl-block");
    var stageState = segment.state;

    block.href = withPreview(segment.data.link || CONFIG.timelinePage);
    block.setAttribute("role", "listitem");
    block.setAttribute("data-section", segment.data.section);
    block.setAttribute("data-state", stageState);
    block.style.flexGrow = String(segment.units);

    var head = element("span", "nea-tl-block-head");
    head.appendChild(element("span", "nea-tl-block-section", segment.data.section));
    head.appendChild(
      element(
        "span",
        "nea-tl-block-state",
        stageState === "past" ? "✓ Done" : stageState === "current" ? "Now" : ""
      )
    );
    block.appendChild(head);

    block.appendChild(element("span", "nea-tl-block-label", segment.data.short));
    block.appendChild(
      element(
        "span",
        "nea-tl-block-days",
        segment.schoolDays + (segment.schoolDays === 1 ? " school day" : " school days")
      )
    );

    block.setAttribute(
      "aria-label",
      segment.data.name +
        ", Section " +
        segment.data.section +
        ", " +
        longDate(segment.startDay) +
        " to " +
        longDate(segment.endDay) +
        ", " +
        (stageState === "past"
          ? "finished"
          : stageState === "current"
          ? "happening now"
          : "still to come") +
        ". Opens the resources for this stage."
    );

    return block;
  }

  function holidayBlock(segment) {
    var block = element("div", "nea-tl-block nea-tl-block--closed");

    block.setAttribute("role", "listitem");
    block.style.flexGrow = String(segment.units);
    block.appendChild(element("span", "nea-tl-block-label", "School closed"));
    block.appendChild(
      element(
        "span",
        "nea-tl-block-days",
        formatDate(segment.startDay, { day: "numeric", month: "short" }) +
          " – " +
          formatDate(segment.endDay, { day: "numeric", month: "short" })
      )
    );
    block.title =
      segment.name +
      ": " +
      longDate(segment.startDay) +
      " to " +
      longDate(segment.endDay) +
      (segment.note ? " (" + segment.note + ")" : "");

    return block;
  }

  function markButton(mark) {
    var button = element("button", "nea-tl-mark");
    var markStage = stageForMark(mark);

    button.type = "button";
    button.setAttribute("data-type", mark.type);
    button.setAttribute("data-state", mark.day < todayDay ? "past" : "future");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("data-day", String(mark.day));
    button.setAttribute(
      "aria-label",
      markTypeLabel(mark) +
        ", " +
        formatDate(mark.day, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }) +
        ": " +
        mark.data.label
    );

    button.appendChild(element("span", "nea-tl-mark-pin"));

    var tip = element("span", "nea-tl-mark-tip");
    tip.setAttribute("aria-hidden", "true");
    tip.appendChild(element("span", "nea-tl-mark-tip-type", markTypeLabel(mark)));
    tip.appendChild(element("strong", null, mark.data.label));
    tip.appendChild(
      element(
        "span",
        "nea-tl-mark-tip-date",
        formatDate(mark.day, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      )
    );

    if (markStage) {
      tip.appendChild(element("span", "nea-tl-mark-tip-stage", markStage.data.name));
    }

    button.appendChild(tip);

    /* A tap opens the tooltip; it must never follow a stage link */
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      closeTips(button);
      var open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", open ? "false" : "true");
      button.classList.toggle("is-open", !open);
    });

    return button;
  }

  function closeTips(except) {
    var open = document.querySelectorAll(".nea-tl-mark.is-open");
    var index;

    for (index = 0; index < open.length; index += 1) {
      if (open[index] !== except) {
        open[index].classList.remove("is-open");
        open[index].setAttribute("aria-expanded", "false");
      }
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeTips(null);
    }
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest || !event.target.closest(".nea-tl-mark")) {
      closeTips(null);
    }
  });

  function buildHorizontal() {
    var wrap = element("div", "nea-tl-wrap");
    var scroller = element("div", "nea-tl-scroller");
    var track = element("div", "nea-tl-track");
    var lane = element("div", "nea-tl-lane");
    var markRow = element("div", "nea-tl-markrow");

    scroller.setAttribute("tabindex", "0");
    scroller.setAttribute("role", "group");
    scroller.setAttribute(
      "aria-label",
      "NEA timeline, " +
        longDate(rangeStart) +
        " to " +
        longDate(rangeEnd) +
        ", scrolls sideways"
    );
    lane.setAttribute("role", "list");

    laneBlocks = [];

    segments.forEach(function (segment) {
      var block = segment.kind === "stage" ? stageBlock(segment) : holidayBlock(segment);
      laneBlocks.push({ segment: segment, el: block });
      lane.appendChild(block);
    });

    /* today marker, positioned by positionOverlays once it is on the page */
    var marker = element("div", "nea-tl-today");
    marker.setAttribute(
      "data-edge",
      todayDay < rangeStart ? "start" : todayDay > rangeEnd ? "end" : "mid"
    );

    var chip = element(
      "span",
      "nea-tl-today-chip",
      state === "after" ? "NEA complete" : state === "before" ? "Starts here" : "Today"
    );
    marker.appendChild(chip);
    marker.appendChild(element("span", "nea-tl-today-line"));
    track.appendChild(marker);

    track.appendChild(lane);

    marks.forEach(function (mark) {
      if (mark.day >= rangeStart && mark.day <= rangeEnd) {
        markRow.appendChild(markButton(mark));
      }
    });

    track.appendChild(markRow);
    scroller.appendChild(track);
    wrap.appendChild(scroller);

    return wrap;
  }

  /* ---------- vertical timeline (narrow screens) ---------- */

  function buildVertical() {
    var list = element("ol", "nea-tl-vlist");

    segments.forEach(function (segment) {
      var item = element("li", "nea-tl-vitem");

      if (segment.kind === "holiday") {
        var closed = element("div", "nea-tl-vblock nea-tl-vblock--closed");
        closed.appendChild(element("span", "nea-tl-block-label", "School closed"));
        closed.appendChild(
          element(
            "span",
            "nea-tl-block-days",
            segment.name +
              " · " +
              mediumDate(segment.startDay) +
              " – " +
              mediumDate(segment.endDay)
          )
        );
        item.appendChild(closed);
        list.appendChild(item);
        return;
      }

      var stageState = segment.state;
      var block = element("a", "nea-tl-vblock");

      block.href = withPreview(segment.data.link || CONFIG.timelinePage);
      block.setAttribute("data-section", segment.data.section);
      block.setAttribute("data-state", stageState);

      var head = element("span", "nea-tl-vblock-head");
      head.appendChild(element("span", "nea-tl-block-section", segment.data.section));
      head.appendChild(
        element(
          "span",
          "nea-tl-block-state",
          stageState === "past" ? "✓ Done" : stageState === "current" ? "Now" : "To come"
        )
      );
      block.appendChild(head);

      block.appendChild(element("span", "nea-tl-vblock-name", segment.data.name));
      block.appendChild(
        element(
          "span",
          "nea-tl-block-days",
          mediumDate(segment.startDay) +
            " – " +
            mediumDate(segment.endDay) +
            " · " +
            segment.schoolDays +
            " school days"
        )
      );

      item.appendChild(block);

      var own = marks.filter(function (mark) {
        return mark.day >= segment.startDay && mark.day <= segment.endDay;
      });

      if (own.length) {
        var marksList = element("ul", "nea-tl-vmarks");

        own.forEach(function (mark) {
          var row = element("li", "nea-tl-vmark");
          row.setAttribute("data-type", mark.type);
          row.setAttribute("data-state", mark.day < todayDay ? "past" : "future");
          row.appendChild(element("span", "nea-tl-vmark-pin"));
          row.appendChild(
            element(
              "span",
              "nea-tl-vmark-date",
              mediumDate(mark.day) + " · " + markTypeLabel(mark)
            )
          );
          row.appendChild(element("span", "nea-tl-vmark-label", mark.data.label));
          marksList.appendChild(row);
        });

        item.appendChild(marksList);
      }

      list.appendChild(item);
    });

    return list;
  }

  /* ---------- the compact strip ---------- */

  function stripText() {
    if (state === "before") {
      return {
        stage: "NEA starts " + mediumDate(rangeStart),
        rest: nextMark ? "first check-in " + mediumDate(nextMark.day) : ""
      };
    }

    if (state === "after") {
      return { stage: "NEA complete", rest: "handed in " + mediumDate(rangeEnd) };
    }

    var closed = state === "closed";
    var name = closed ? "School closed" : currentStage.data.name;
    var back = closed ? "back " + mediumDate(lessonDay) + " · " : "";

    if (!nextMark) {
      return { stage: name, rest: back + "no dates left" };
    }

    if (nextMark.day === todayDay) {
      return { stage: name, rest: back + "due today: " + nextMark.data.label };
    }

    var days = schoolDaysUntil(nextMark.day);

    return {
      stage: name,
      rest:
        back +
        (days === 1 ? "1 school day" : days + " school days") +
        " to " +
        nextMark.data.label
    };
  }

  function buildStrip(host) {
    var level = urgencyFor(nextMark);
    var link = element("a", "nea-strip-inner");
    var words = stripText();

    link.href = withPreview(CONFIG.timelinePage);
    host.setAttribute("data-urgency", level);

    var progress = element("span", "nea-strip-progress");
    progress.setAttribute("aria-hidden", "true");

    var done =
      state === "before"
        ? 0
        : state === "after"
        ? 100
        : (schoolDaysBetween(rangeStart, todayDay) /
            Math.max(1, schoolDaysBetween(rangeStart, rangeEnd))) *
          100;

    var fill = element("span", "nea-strip-fill");
    fill.style.width = done + "%";
    progress.appendChild(fill);

    var dot = element("span", "nea-strip-dot");
    dot.style.left = done + "%";
    progress.appendChild(dot);

    var text = element("span", "nea-strip-text");
    text.appendChild(element("strong", null, words.stage));
    text.appendChild(element("span", "nea-strip-sep", "·"));
    text.appendChild(element("span", "nea-strip-rest", words.rest));

    if (preview) {
      text.appendChild(element("span", "nea-strip-preview", "Preview " + mediumDate(todayDay)));
    }

    var cta = element("span", "nea-strip-cta");
    cta.appendChild(urgencyIcon(level));
    cta.appendChild(element("span", null, "NEA timeline"));

    link.setAttribute(
      "aria-label",
      words.stage + ", " + words.rest + ". Opens the full NEA timeline."
    );

    link.appendChild(progress);
    link.appendChild(text);
    link.appendChild(cta);
    host.appendChild(link);
  }

  /* ---------- mount ---------- */

  var narrow = window.matchMedia("(max-width: 599px)");

  function buildFull(root) {
    var lane = root.querySelector("[data-tl-lane]");

    if (!lane) {
      lane = element("div");
      lane.setAttribute("data-tl-lane", "");
      root.appendChild(lane);
      root.appendChild(buildPanel());
      root.appendChild(buildSections());
    }

    lane.textContent = "";
    lane.appendChild(narrow.matches ? buildVertical() : buildHorizontal());

    if (!narrow.matches) {
      positionOverlays(root);
      scrollToToday(root);
    }
  }

  /* Keep the markers on their blocks when the window changes size */
  function watchResize(root) {
    var queued = false;

    function refresh() {
      if (queued) {
        return;
      }

      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;

        if (!narrow.matches) {
          positionOverlays(root);
        }
      });
    }

    window.addEventListener("resize", refresh);

    if (window.ResizeObserver) {
      new window.ResizeObserver(refresh).observe(root);
    }
  }

  function scrollToToday(root) {
    var scroller = root.querySelector(".nea-tl-scroller");

    if (!scroller) {
      return;
    }

    var overflow = scroller.scrollWidth - scroller.clientWidth;

    if (overflow <= 0) {
      return;
    }

    var lane = root.querySelector(".nea-tl-lane");
    var position = lane ? pxFor(todayDay, false, lane.getBoundingClientRect()) : 0;

    scroller.scrollLeft = Math.max(
      0,
      Math.min(overflow, position - scroller.clientWidth / 3)
    );
  }

  var fullRoot = document.querySelector("[data-nea-timeline]");
  var stripHost = document.querySelector("[data-nea-timeline-strip]");

  if (fullRoot) {
    if (preview) {
      var banner = element(
        "p",
        "nea-tl-preview",
        "Preview date: " +
          formatDate(todayDay, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          }) +
          " — remove ?date= from the address to see the real date."
      );
      fullRoot.appendChild(banner);
    }

    buildFull(fullRoot);
    watchResize(fullRoot);

    if (narrow.addEventListener) {
      narrow.addEventListener("change", function () {
        buildFull(fullRoot);
      });
    } else if (narrow.addListener) {
      narrow.addListener(function () {
        buildFull(fullRoot);
      });
    }
  }

  if (stripHost) {
    buildStrip(stripHost);
  }
})();
