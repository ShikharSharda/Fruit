import { gsap } from './node_modules/gsap';

import { ScrollTrigger } from './node_modules/gsap/ScrollTrigger.js';

/* The following plugin is a Club GSAP perk */
import { SplitText } from './node_modules/gsap/SplitText.js';

gsap.to('.box', { x: 100 });

gsap.registerPlugin(ScrollTrigger, SplitText);

let elements = document.querySelectorAll('.home-hero_text');
let effectsTimeline = gsap.timeline();

gsap.registerEffect({
  name: 'slideIn',
  extendTimeline: true,
  defaults: {
    y: 0,
    x: 0,
    duration: 1,
    ease: 'power1',
  },
  effect: (targets, config) => {
    let tl = gsap.timeline();
    tl.from(targets, {
      duration: config.duration,
      ease: config.ease,
      x: config.x,
      y: config.y,
      stagger: {
        each: 0.03,
        ease: 'power1',
      },
    });
    tl.from(
      targets,
      {
        duration: config.duration,
        opacity: 0,
        ease: 'none',
        stagger: {
          each: 0.03,
          ease: 'power2',
        },
      },
      0
    );
    return tl;
  },
});

gsap.registerEffect({
  name: 'slideOut',
  extendTimeline: true,
  defaults: {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: 'power1.in',
  },
  effect: (targets, config) => {
    let tl = gsap.timeline();
    tl.to(targets, {
      duration: config.duration,
      x: config.x,
      y: config.y,
      ease: 'power1.in',
      stagger: {
        each: 0.01,
        ease: 'power1',
      },
    });
    tl.to(
      targets,
      {
        duration: config.duration,
        opacity: 0,
        ease: 'none',
        stagger: {
          each: 0.01,
          ease: 'power2',
        },
      },
      0
    );
    return tl;
  },
});

// by creating an effect using registerEffect() we can now write much less code when we build our animation

function splitElements() {
  elements.forEach(function (element, index) {
    let split = new SplitText(element, { type: 'words' });

    //use our custom effects called slideIn and slideOut
    effectsTimeline
      .slideIn(split.words, { y: 100, ease: 'back' })
      .slideOut(split.words, { y: -100, duration: 0.2 });
  });
}

splitElements();
