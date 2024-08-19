import { gsap } from './node_modules/gsap';

import { ScrollTrigger } from './node_modules/gsap/ScrollTrigger.js';

/* The following plugin is a Club GSAP perk */
import { SplitText } from './node_modules/gsap/SplitText.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

//Global variables
let globalPlayState = true;
let globalMuteState = false;

const lottieAnimations = [
  'https://uploads-ssl.webflow.com/66ba352fa7134def88ade3c1/66bb5fd7bb252205b33e68de_65cdf882218339a1bb49c9f5_Leaf%2001.json',
  'https://uploads-ssl.webflow.com/66ba352fa7134def88ade3c1/66bb5fa49d0ee287cade453c_65cdf882765a69af7c1dee90_Leaf%2002.json',
  'https://uploads-ssl.webflow.com/66ba352fa7134def88ade3c1/66bb5f662d17ee2c72257aec_65cdf88239dc5b5eeb090c11_Leaf%2003.json',
];

//General
const initHeroText = function () {
  let elements = document.querySelectorAll('.home-hero_text');
  let effectsTimeline = gsap.timeline({ repeat: -1 });

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
};

const initDocumentClick = function () {
  document.addEventListener('click', function (event) {
    const randomIndex =
      Math.floor(Math.random() * lottieAnimations.length) <= 2
        ? Math.floor(Math.random() * lottieAnimations.length)
        : 2;

    const selectedAnimation = lottieAnimations[randomIndex];

    const lottieContainer = document.createElement('div');
    lottieContainer.style.position = 'absolute';
    lottieContainer.style.width = '180px';
    lottieContainer.style.height = '180px';
    lottieContainer.style.left = event.pageX - 90 + 'px';
    lottieContainer.style.top = event.pageY - 90 + 'px';
    lottieContainer.style.zIndex = '9999';
    lottieContainer.style.pointerEvents = 'none';

    const randomRotation = Math.floor(Math.random() * 360);
    lottieContainer.style.transform = `rotate(${randomRotation}deg)`;

    document.body.appendChild(lottieContainer);

    const animation = lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: selectedAnimation,
    });
    animation.addEventListener('complete', function () {
      lottieContainer.remove();
    });
  });
};

const initCursorAndButtons = function () {
  function setPositionAndTransform(container, position) {
    switch (position) {
      case 'top-left':
        container.style.left = '0px';
        container.style.top = '0px';
        container.style.transform = 'translate(-50%, -50%)';
        break;
      case 'top-right':
        container.style.right = '0px';
        container.style.top = '0px';
        container.style.transform = 'translate(50%, -50%)';
        break;
      case 'bottom-left':
        container.style.left = '0px';
        container.style.bottom = '0px';
        container.style.transform = 'translate(-50%, 50%)';
        break;
      case 'bottom-right':
        container.style.right = '0px';
        container.style.bottom = '0px';
        container.style.transform = 'translate(50%, 50%)';
        break;
    }
  }

  document.querySelectorAll('.button').forEach((button) => {
    button.addEventListener('mouseenter', function () {
      const parentElement = button.parentElement;
      // Make lottieContainer with random animation and position
      const lottieContainer = document.createElement('div');
      lottieContainer.style.position = 'absolute';
      lottieContainer.style.width = '120px';
      lottieContainer.style.height = '120px';
      lottieContainer.style.zIndex = '9999';
      lottieContainer.style.pointerEvents = 'none';

      const randomAnimationIndex = Math.floor(
        Math.random() * lottieAnimations.length <= 2
          ? Math.random() * lottieAnimations.length
          : 2
      );

      const randomAnimation = lottieAnimations[randomAnimationIndex];

      const position = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

      const randomPositionIndex = Math.floor(
        Math.random() * position.length <= 3
          ? Math.random() * position.length
          : 3
      );

      const randomPosition = position[randomPositionIndex];

      setPositionAndTransform(lottieContainer, randomPosition);

      parentElement.appendChild(lottieContainer);

      const animation = lottie.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: randomAnimation,
      });

      animation.addEventListener('complete', function () {
        lottieContainer.remove();
      });
    });
  });
};

const initGuide = function () {
  const guides = Array.from(document.querySelectorAll('.guide-item'));
  const guideOverlays = Array.from(
    document.querySelectorAll('.guide-overlay-item')
  );
  const guideNav = document.querySelector('.guide-overlay-nav');
  const prevBtn = guideNav.querySelector('.guide-prev-btn');
  const nextBtn = guideNav.querySelector('.guide-next-btn');

  guides.forEach((guide, index) => {
    const image = guide.querySelector('.guide-image-wrap');
    const video = guide.querySelector('video');

    const randomRotation = gsap.utils.random(-3, 3);
    gsap.set(guide, { rotate: `${randomRotation}` });

    const originalZIndex = index + 1;
    gsap.set(guide, { zIndex: originalZIndex });

    // On Hover In
    guide.addEventListener('mouseenter', () => {
      const randomHoverRotation = gsap.utils.random(-3, 3);

      gsap.set(image, {
        opacity: 0,
      });

      gsap.set(video, {
        opacity: 1,
      });

      video.play();

      gsap.to(guide, {
        rotate: `${randomHoverRotation}`,
        duration: 0.2,
        scale: 1.2,
        zIndex: 10,
        ease: 'power3',
      });
    });

    // On Hover Out
    guide.addEventListener('mouseleave', () => {
      const randomHoverRotation = gsap.utils.random(-3, 3);

      gsap.set(image, {
        opacity: 1,
      });

      gsap.set(video, {
        opacity: 0,
      });

      video.pause();

      gsap.to(guide, {
        rotate: `${randomHoverRotation}`,
        duration: 0.2,
        scale: 1,
        zIndex: originalZIndex,
        ease: 'power3',
      });
    });

    // On Click
    guide.addEventListener('click', (e) => {
      gsap.set('.guide-overlay', { display: 'flex' });

      let currentItem = e.target.closest('.guide-item');

      let clickedGuideIndex = guides.findIndex((g) => g === currentItem);
      let currentOverlayItem = guideOverlays[clickedGuideIndex];
      currentOverlayItem.classList.add('active');

      gsap.set('.overlay-box', { display: 'flex' });
      gsap.fromTo(
        '.overlay-box',
        {
          y: '1.5rem',
          opacity: 0,
          ease: 'power3',
        },
        {
          y: 0,
          opacity: 1,
          ease: 'power3',
          duration: 1,
          onComplete: () => handleSoundVideo(),
        }
      );

      // Update prev/next button text
      let prevItemIndex =
        index === 0 ? guides.length - 1 : clickedGuideIndex - 1;
      let nextItemIndex =
        index === guides.length - 1 ? 0 : clickedGuideIndex + 1;

      let prevItemName =
        guideOverlays[prevItemIndex].getAttribute('guide-name');
      let nextItemName =
        guideOverlays[nextItemIndex].getAttribute('guide-name');

      prevBtn.textContent = `Meet ${prevItemName}`;
      nextBtn.textContent = `Meet ${nextItemName}`;

      // Show selected Item
      guideOverlays.forEach((item) => {
        item.style.display = 'none';
      });

      currentOverlayItem.style.display = 'grid';

      // // Handle Sound/Video
      function handleSoundVideo() {
        const currentVideo = currentOverlayItem.querySelector('video');
        if (globalPlayState) {
          currentVideo.play();
        }
        currentVideo.muted = globalMuteState;
      }

      // // Previous/Next click
      function updateActiveItem() {
        const guidePrevNextBtn = Array.from(
          document.querySelectorAll('[guide-nav-control]')
        );

        let currentOverlayItemIndex;
        currentOverlayItemIndex = guideOverlays.findIndex(
          (g) => g === currentOverlayItem
        );

        guidePrevNextBtn.forEach((btn) => {
          btn.addEventListener('click', () => {
            // Add gsap animation
            const fadeOutItems = Array.from(
              currentOverlayItem.querySelectorAll('[fade]')
            );

            const directionToAnimate = btn.classList.contains('guide-prev-btn')
              ? -10
              : 10;

            currentOverlayItem.querySelector('video').pause();

            gsap.to(fadeOutItems, {
              opacity: 0,
              ease: 'power3',
              y: `${directionToAnimate}rem`,
              // y: -100,
              duration: 0.3,
              stagger: 0.1,
              onStart: () => {},
              onComplete: () => {
                currentOverlayItem.style.display = 'none';

                currentOverlayItem.classList.remove('active');
                fadeInItems();

                // updateMeetTextWhenNavigating();
              },
            });

            function fadeInItems() {
              // Update current overlay item

              if (btn.classList.contains('guide-prev-btn')) {
                currentOverlayItemIndex =
                  currentOverlayItemIndex === 0
                    ? guides.length - 1
                    : currentOverlayItemIndex - 1;
              } else {
                currentOverlayItemIndex =
                  currentOverlayItemIndex === guides.length - 1
                    ? 0
                    : currentOverlayItemIndex + 1;
              }

              currentOverlayItem = guideOverlays[currentOverlayItemIndex];

              currentOverlayItem.style.display = 'grid';
              currentOverlayItem.classList.add('active');

              //Update Meet Texts
              prevItemIndex =
                currentOverlayItemIndex === 0
                  ? guides.length - 1
                  : currentOverlayItemIndex - 1;
              nextItemIndex =
                currentOverlayItemIndex === guides.length - 1
                  ? 0
                  : currentOverlayItemIndex + 1;

              prevItemName =
                guideOverlays[prevItemIndex].getAttribute('guide-name');
              nextItemName =
                guideOverlays[nextItemIndex].getAttribute('guide-name');

              // const prevText = currentOverlayItem.querySelector('.guide-overlay-prev');
              // const nextText = currentOverlayItem.querySelector('.guide-overlay-next');

              prevBtn.textContent = `Meet ${prevItemName}`;
              nextBtn.textContent = `Meet ${nextItemName}`;

              const fadeInItems = currentOverlayItem.querySelectorAll('[fade]');

              //Handle Sound/Video
              const newVideo = currentOverlayItem.querySelector('video');
              if (globalPlayState) {
                newVideo.play();
              }
              newVideo.muted = globalMuteState;

              gsap.fromTo(
                fadeInItems,
                {
                  opacity: 0,
                  y: `${directionToAnimate * -1}rem`,
                },
                {
                  opacity: 1,
                  y: '0rem',
                  duration: 0.3,
                  stagger: 0.1,
                }
              );
            }
          });
        });
      }

      updateActiveItem();

      // Manage global sound and play
      // Close guides overlay functionality
    });
  });
};

const initVideoSound = function () {
  const allIcons = document.querySelectorAll('.sound-icon');

  function toggleSoundIcon() {
    allIcons.forEach((icon) => {
      if (icon.classList.contains('muted')) {
        icon.querySelector('.sound-on-icon').style.display = 'block';
        icon.querySelector('.sound-off-icon').style.display = 'none';
      } else {
        icon.querySelector('.sound-on-icon').style.display = 'none';
        icon.querySelector('.sound-off-icon').style.display = 'block';
      }
    });
  }

  toggleSoundIcon();

  allIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      globalMuteState = !globalMuteState;

      if (globalMuteState) {
        allIcons.forEach((icon) => {
          icon.classList.add('muted');
        });
      } else {
        allIcons.forEach((icon) => {
          icon.classList.remove('muted');
        });
      }

      toggleSoundIcon();
    });
  });
};

// Init
const initGeneral = function () {
  initHeroText();
  initDocumentClick();
  initCursorAndButtons();
  initVideoSound();
  initGuide();
};

initGeneral();
