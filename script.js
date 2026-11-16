/* Una Notte nei Tempi — small interactions: mobile nav, IT/EN switch, year */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ---------- Language switch (IT / EN) ---------- */
  var textNodes = Array.prototype.slice.call(
    document.querySelectorAll("[data-it][data-en]")
  );
  var langToggle = document.getElementById("langToggle");

  function applyLanguage(lang) {
    var other = lang === "it" ? "en" : "it";

    document.documentElement.lang = lang;

    textNodes.forEach(function (node) {
      var value = node.getAttribute("data-" + lang);
      if (value) node.textContent = value;
    });

    document.querySelectorAll("[data-lang-label]").forEach(function (label) {
      label.setAttribute(
        "data-active",
        String(label.getAttribute("data-lang-label") === lang)
      );
    });

    if (langToggle) {
      langToggle.setAttribute(
        "aria-label",
        lang === "it" ? "Passa all'inglese" : "Switch to Italian"
      );
    }

    try {
      localStorage.setItem("unt-lang", lang);
    } catch (e) {
      /* storage may be unavailable — the switch still works for this visit */
    }
  }

  if (textNodes.length) {
    var saved = null;
    try {
      saved = localStorage.getItem("unt-lang");
    } catch (e) {
      saved = null;
    }

    var initial =
      saved === "it" || saved === "en"
        ? saved
        : (navigator.language || "it").toLowerCase().indexOf("it") === 0
          ? "it"
          : "en";

    applyLanguage(initial);

    if (langToggle) {
      langToggle.addEventListener("click", function () {
        var next = document.documentElement.lang === "it" ? "en" : "it";
        applyLanguage(next);
      });
    }
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
