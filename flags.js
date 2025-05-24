// All credits to Josh Comeau for the original idea and implementation. I just made it into a web component.
// https://www.joshwcomeau.com/animation/pride-flags/#pixel-rounding-quirk-9
customElements.define(
  "pride-flag",
  class extends HTMLElement {
    static get observedAttributes() {
      return ["columns", "delay", "billow", "speed"];
    }
    connectedCallback(
      HSLcolors = [
        [0, 0, 18],
        [30, 60, 30],
        [0, 90, 55],
        [30, 95, 65],
        [55, 90, 65],
        [100, 65, 45],
        [220, 80, 55],
        [265, 80, 50],
      ]
    ) {
      this.HSLcolors = HSLcolors;
      this.attachShadow({ mode: "open" }); // create shadowRoot so multiple instances can be used on the same page
      this.render();
    }
    attributeChangedCallback(name, oldValue, newValue) {
      // do not render when the element is not connected to the DOM YET (attributeChangedCallback is called before connectedCallback!!)
      if (this.isConnected) this.render();
    }
    render() {
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.append(...this.flag());
    }
    flag() {
      let createElement = ({
        create = "div", // default element is a <div>
        append = [], // append array of child elements
        styles = {}, // optional styles
        classes = "", // optional classnames
        ...props // all remaing properties; innerHTML, id, title, etc.
      }) => {
        Object.assign((create = document.createElement(create)), props).append(
          ...append
        );
        Object.assign(create.style, styles);
        create.className = classes;
        return create;
      };
      let colors = this.HSLcolors.map(
        ([angle, saturation, lightness]) =>
          `hsl(${angle}deg ${saturation}% ${lightness}%)`
      );
      // HTML attributes
      let attribute = (name, defaultValue) =>
        parseFloat(this.getAttribute(name) || defaultValue);
      this.columns = attribute("columns", 60);
      this.delay = attribute(
        "delay",
        ~~((this.columns * 10) / Math.pow(2, this.columns / 10 - 1))
      );
      this.billow = attribute("billow", 10) / 10;
      this.speed = attribute("speed", 600);
      // return DOM elements array
      return [
        createElement({
          create: "STYLE",
          innerHTML: `
                    :1host { display:inline-block; width: 100px}
                    @keyframes oscillate {
                        from {transform:translateY(var(--billow,2))}to{transform:translateY(calc(var(--billow,2)*-1))}
                    }
                    .flag {display:flex;aspect-ratio:3/2}
                    .column{flex:1;display:flex;flex-direction:column;animation:oscillate ${this.speed}ms alternate infinite ease-in-out both}
                    .column:first-child{border-top-left-radius:8px;border-bottom-left-radius:8px}
                    .column:last-child{border-top-right-radius:8px;border-bottom-right-radius:8px}`,
        }), // createElement
        createElement({
          classes: "flag",
          append: Array(this.columns)
            .fill()
            .map((_, columnIndex) => {
              let el = createElement({
                classes: "column",
                styles: {
                  background: `linear-gradient(to bottom,${colors
                    .map(
                      (color, index) =>
                        `${color} ${(index * 100) / colors.length}% ${
                          ((index + 1) * 100) / colors.length
                        }%`
                    )
                    .join(",")})`,
                  animationDelay:
                    -this.columns * this.delay +
                    columnIndex * this.delay +
                    "ms",
                }, // styles
              }); // element
              el.style.setProperty(
                "--billow",
                columnIndex * this.billow + "px"
              );
              return el;
            }), // append
        }), // createElement
      ]; // return
    } // flag
  }
); // customElements.define

customElements.define(
  "pride-pan-flag",
  class extends customElements.get("pride-flag") {
    connectedCallback() {
      super.connectedCallback([
        [331, 100, 55],
        [50, 100, 50],
        [200, 100, 55],
      ]);
    }
  }
);
customElements.define(
  "pride-trans-flag",
  class extends customElements.get("pride-flag") {
    connectedCallback() {
      super.connectedCallback([
        [200, 85, 70],
        [350, 85, 85],
        [0, 0, 100],
        [350, 85, 85],
        [200, 85, 70],
      ]);
    }
  }
);
customElements.define(
  "pride-lesbian-flag",
  class extends customElements.get("pride-flag") {
    connectedCallback() {
      super.connectedCallback([
        [12, 80, 45],
        [25, 80, 55],
        [34, 90, 70],
        [0, 0, 100],
        [330, 60, 75],
        [340, 40, 60],
        [345, 35, 35],
      ]);
    }
  }
);

// Bisexual Flag
customElements.define(
  "pride-bi-flag",
  class extends customElements.get("pride-flag") {
    connectedCallback() {
      super.connectedCallback([
        [322, 100, 50], // Pink
        [322, 100, 50], // Pink (repeat for thicker stripe)
        [322, 57, 53], // White
        [222, 100, 33], // Blue
        [222, 100, 33], // Blue (repeat for thicker stripe)
      ]);
    }
  }
);

// Nonbinary Flag
customElements.define(
  "pride-nb-flag",
  class extends customElements.get("pride-flag") {
    connectedCallback() {
      super.connectedCallback([
        [52, 100, 50], // Yellow
        [0, 0, 100], // White
        [270, 100, 50], // Purple
        [0, 0, 20], // Black
      ]);
    }
  }
);

// Asexual Flag
customElements.define(
  "pride-ace-flag",
  class extends customElements.get("pride-flag") {
    connectedCallback() {
      super.connectedCallback([
        [0, 0, 20], // Black
        [0, 0, 60], // Grey
        [0, 0, 100], // White
        [282, 100, 35], // Purple
      ]);
    }
  }
);

// Gay Men Flag
customElements.define(
  "pride-gaymen-flag",
  class extends customElements.get("pride-flag") {
    connectedCallback() {
      super.connectedCallback([
        [160, 95, 29], // Dark Green: #078D70 (HSL: 160, 95%, 29%)
        [163, 67, 48], // Green: #26CEAA (HSL: 163, 67%, 48%)
        [152, 60, 75], // Light Green: #98E8C1 (HSL: 152, 60%, 75%)
        [0, 0, 100], // White: #FFFFFF (HSL: 0, 0%, 100%)
        [213, 60, 68], // Light Blue: #7BADE2 (HSL: 213, 60%, 68%)
        [245, 49, 54], // Indigo: #5049CC (HSL: 245, 49%, 54%)
        [262, 65, 28], // Blue: #3D1A78 (HSL: 262, 65%, 28%)
      ]);
    }
  }
);

document.addEventListener('DOMContentLoaded', function() {
    const flagsSection = document.querySelector('.flagsSection');
    const flagCards = Array.from(document.querySelectorAll('.eachFlag'));
    let isHijacking = false;
    let currentIndex = 0;

    // Threshold and cooldown settings
    const SCROLL_THRESHOLD = 40; // Minimum deltaY to trigger a snap
    const SNAP_COOLDOWN = 400;   // Minimum ms between snaps
    let lastSnapTime = 0;

    // Helper: Check if flagsSection is in viewport
    function isInViewport(elem) {
        const rect = elem.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        );
    }

    // Lock or unlock body scroll
    function lockBodyScroll(lock) {
        document.body.style.overflow = lock ? 'hidden' : '';
    }

    // Scroll to a flag card by index
    function scrollToFlag(index) {
        if (flagCards[index]) {
            flagCards[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', function() {
        if (!isHijacking && isInViewport(flagsSection)) {
            isHijacking = true;
            lockBodyScroll(true);
        }
    });

    // Wheel event for desktop
    flagsSection.addEventListener('wheel', function(e) {
        if (isHijacking) {
            e.preventDefault();
            const now = Date.now();
            // Only trigger if enough time has passed since last snap
            if (now - lastSnapTime < SNAP_COOLDOWN) return;
            // Only trigger if scroll is significant enough
            if (Math.abs(e.deltaY) < SCROLL_THRESHOLD) return;
            lastSnapTime = now;

            let direction = e.deltaY > 0 ? 1 : -1;
            let nextIndex = Math.min(Math.max(currentIndex + direction, 0), flagCards.length - 1);
            if (nextIndex !== currentIndex) {
                currentIndex = nextIndex;
                scrollToFlag(currentIndex);
            }
            // Unlock if at the end and scrolling forward
            if (currentIndex === flagCards.length - 1 && direction > 0) {
                isHijacking = false;
                lockBodyScroll(false);
            }
            // Unlock if at the start and scrolling backward
            if (currentIndex === 0 && direction < 0) {
                isHijacking = false;
                lockBodyScroll(false);
            }
        }
    }, { passive: false });

    // Touch events for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let lastTouchSnapTime = 0;

    flagsSection.addEventListener('touchstart', function(e) {
        if (isHijacking) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    });

    flagsSection.addEventListener('touchend', function(e) {
        if (isHijacking) {
            let touchEndX = e.changedTouches[0].clientX;
            let touchEndY = e.changedTouches[0].clientY;
            let deltaX = touchEndX - touchStartX;
            let deltaY = touchEndY - touchStartY;
            const now = Date.now();
            // Only hijack vertical swipes with enough distance and cooldown
            if (
                Math.abs(deltaY) > Math.abs(deltaX) &&
                Math.abs(deltaY) > SCROLL_THRESHOLD &&
                (now - lastTouchSnapTime > SNAP_COOLDOWN)
            ) {
                lastTouchSnapTime = now;
                let direction = deltaY < 0 ? 1 : -1;
                let nextIndex = Math.min(Math.max(currentIndex + direction, 0), flagCards.length - 1);
                if (nextIndex !== currentIndex) {
                    currentIndex = nextIndex;
                    scrollToFlag(currentIndex);
                }
                // Unlock if at the end and scrolling forward
                if (currentIndex === flagCards.length - 1 && direction > 0) {
                    isHijacking = false;
                    lockBodyScroll(false);
                }
                // Unlock if at the start and scrolling backward
                if (currentIndex === 0 && direction < 0) {
                    isHijacking = false;
                    lockBodyScroll(false);
                }
            }
        }
    }, { passive: false });
});


