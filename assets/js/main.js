// 1. Hero
function hero() {
  // Animation
  const hero = document.getElementById("hero");
  const heroTl = gsap.timeline();

  heroTl
    .to(".header__inner", { y: 0, duration: 1, delay: 1 })
    .to(".hero__img-box:not(:first-child)", { y: 0, stagger: 0.5 }, "<")
    .to(".hero__text-box", { opacity: 1 })
    .from(
      ".hero__title span:first-child span",
      { yPercent: -100, duration: 1 },
      "<"
    )
    .from(
      ".hero__title span:last-child span",
      { yPercent: 100, duration: 1 },
      "<"
    )
    .to(".hero__inner", { scale: 1, duration: 0.5, ease: "none" })
    .from(".hero__info-item", { yPercent: 100, stagger: 0.2, duration: 0.8 })
    .to(".hero__img-box:last-child img", {
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      yPercent: -15,
    });

  // Ramdom image
  // var HeroImgNum = $(".hero__img-box").length;
  // var HeroImgArray = ["./assets/images/hero-img01.jpg", "./assets/images/hero-img02.jpg", "./assets/images/hero-img03.jpg", "./assets/images/hero-img04.jpg"];

  // for (i = 0; i < HeroImgNum; i += 1) {
  // // Math.random() 함수는 0~1 사이의 임의의 난수를 반환, Math.floor(num) num 이하 가장 큰 정수를 반환 (소수점 아래 내림)
  // // Math.random() 에 배열의 길이를 곱하고 Math.floor(내림)을 적용 시키면 0, 1, 2, 3 중의 하나의 수가 나옴
  // var RandomNum = Math.floor(Math.random() * HeroImgNum);

  // if (HeroImgArray.indexOf(RandomNum) === -1) { // 중복방지 // indexOf는 배열에서 지정된 요소를 찾을 수 있는 첫 번째 인덱스를 반환하고 존재하지 않으면 -1을 반환
  //     HeroImgArray.push(RandomNum); //push() 함수는 배열추가
  //     $('.hero__img-box').eq(i).append(
  //         '<img src="'+HeroImgArray[RandomNum]+'" alt="">'
  //     );
  //     } else {
  //         i -= 1;
  //     }
  // }
}

// 2. About
function about() {
  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  function aboutTitleTl(i) {
    return gsap
      .timeline()
      .to(`.about__title span:nth-child(${i})`, { opacity: 1, delay: 0.5 })
      .to(`.about__subtitle span:nth-child(${i})`, { autoAlpha: 1 })
      .to(`.about__title span:nth-child(${i})`, { opacity: 0.2, delay: 0.5 })
      .to(`.about__subtitle span:nth-child(${i})`, { autoAlpha: 0 }, "<");
  }

  aboutTl
    .to(".about__title span:not(:nth-child(1))", { opacity: 0.2 })
    .add(aboutTitleTl(1), "<")
    .add(aboutTitleTl(2))
    .add(aboutTitleTl(3))
    .to(".about__title span", { opacity: "1" })
    .to(".about__text", { autoAlpha: 1 }, "<")
    .to({}, { duration: 1 });
}

// 3. Projects
function project() {
  // Title
  const headings = document.querySelectorAll(".reveal-text");

  headings.forEach((heading) => {
    const text = new SplitType(heading, {
      types: "lines, words, chars",
      tagName: "span",
    });

    const headingTl = gsap.timeline({ paused: true });

    headingTl.set(heading, { opacity: 1 }).from(text.chars, {
      filter: "blur(5px)",
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.inOut",
    });

    ScrollTrigger.create({
      trigger: heading,
      start: "top center",
      end: "bottom top",
      // markers: true,
      // id: "heading",
      onEnter: () => {
        headingTl.play();
      },
    });
  });

  // Title Pin
  ScrollTrigger.create({
    trigger: ".project__title-wrap",
    start: "top top",
    endTrigger: ".project__item.last",
    end: "center center",
    pin: true,
    pinSpacing: false,
    scrub: 1,
  });

  // Project List
  gsap.utils.toArray(".project__item").forEach((item, i) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          refreshPriority: 0,
        },
      })
      .to(item, { scale: 1, ease: "none", duration: 1 }, 0);

    if ($(item).hasClass("last")) {
      return;
    }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: item,
          start: "center 40%",
          end: "center top",
          scrub: 1,
          // markers: true,
          // id : "itemOut",
        },
      })
      .to(item, { scale: 0.5, ease: "none", duration: 1 }, 0);
  });

  gsap.utils
    .toArray(".project__item-img-box .project__item-link")
    .forEach((itemBg, i) => {
      const img = itemBg.querySelector("img");

      gsap.fromTo(
        img,
        { yPercent: -25 },
        {
          scrollTrigger: {
            trigger: itemBg,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            //markers: true,
            //id: "imgBg"
          },
          yPercent: 0,
          ease: "none",
        }
      );
    });

  document.querySelectorAll(".project .project__item-link").forEach((link) => {
    if (window.innerWidth >= 1024) {
      link.addEventListener("focus", function () {
        //closest: 주어진 선택자와 일치하는 요소를 찾을 때까지, 자기 자신을 포함해 위쪽(부모 방향, 문서 루트까지)으로 문서 트리를 순회
        this.closest(".project__item-text-box")?.style.setProperty(
          "height",
          "155px"
        ); //옵셔널 체이닝(?.): null 또는 undefined인 객체에서 속성을 접근할 때 오류를 방지해주는 연산자
      });

      link.addEventListener("blur", function () {
        this.closest(".project__item-text-box")?.style.removeProperty("height");
      });
    }
  });
}

// 3-2. Sub Project
function subProject() {
  // Horizontal Scroll
  const subList = document.querySelector(".sub-project__list");
  const subItem = gsap.utils.toArray(".sub-project__item");

  const mm = gsap.matchMedia();
  mm.add(
    {
      isDesktop: `(min-width: 1025px)`,
      isMobile: `(max-width:1024px)`,
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions;

      if (isDesktop) {
        // Horizontal Scroll
        const scrollTween = gsap.to(subItem, {
          xPercent: -100 * (subItem.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: subList,
            start: "top top",
            end: () => "+=" + (subList.offsetWidth - innerWidth),
            //markers:true,
            scrub: 1,
          },
        });

        gsap.utils
          .toArray(".sub-project__item-text-box")
          .forEach(function (textBox) {
            const imgBox = textBox.previousElementSibling;
            const modal = textBox.nextElementSibling;

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: textBox,
                  containerAnimation: scrollTween, //가로스크롤에서 트리거시점을 잡아주는 옵션
                  start: "center 70%",
                  end: "center 45%",
                  scrub: true,
                  //markers: true
                },
              })
              .to(imgBox, { filter: "grayscale(0)", ease: "none", duration: 1 })
              .to(textBox, { opacity: 1, height: "100px" }, "<")
              .to(modal, { opacity: "1" }, "<");

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: textBox,
                  containerAnimation: scrollTween,
                  start: "center 45%",
                  end: "center 20%",
                  scrub: true,
                  //markers: true
                },
              })
              .to(
                imgBox,
                { filter: "grayscale(1)", ease: "none", duration: 1 },
                0
              )
              .to(textBox, { opacity: 0, height: 0 }, "<")
              .to(modal, { opacity: 0 }, "<");
          });
      }
    }
  );

  document.querySelectorAll(".sub-project__item-link").forEach((link) => {
    link.addEventListener("focus", function () {
      const imgBox = this.parentElement;
      if (imgBox) {
        const textBox = imgBox.nextElementSibling;
        if (textBox) {
          const modal = textBox.nextElementSibling;

          imgBox.style.setProperty("filter", "grayscale(0)");
          textBox.style.setProperty("height", "100px");
          textBox.style.setProperty("opacity", "1");
          modal.style.setProperty("opacity", "1");
        }
      }
    });
  });

  // Modal
  const toggles = document.querySelectorAll(".modal__toggle");

  toggles.forEach((toggle) => {
    function toggleModal() {
      $(this).toggleClass("active");
      const modal = $(this).parent(".modal");
      const content = $(this).next(".modal__content");
      const isActive = $(this).hasClass("active");
      const isDesktop = $(window).width() > 1024;

      const size = isDesktop
        ? { open: "360px", close: "45px" }
        : { open: "320px", close: "35px" };
      const borderRadius = isActive ? "20px" : isDesktop ? "45px" : "35px";

      this.setAttribute(
        "aria-label",
        isActive ? "자세히보기 닫기" : "자세히보기"
      );
      this.setAttribute("aria-expanded", isActive.toString()); //isActive: true 또는 false 값을 가지는 Boolean 타입 //.toString(): 값을 문자열로 변환하는 메서드

      gsap
        .timeline()
        .to(modal, {
          width: isActive ? size.open : size.close,
          height: isActive ? "auto" : size.close,
          borderRadius,
        })
        .to(content, { autoAlpha: isActive ? 1 : 0 }, "<");
    }

    toggle.addEventListener("click", toggleModal);

    toggle.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        toggleModal.call(this); // 현재 요소에서 실행되도록 call(this) 사용
      }
    });
  });

  // Counter
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    counter.textContent = "0";
    const targetNum = +counter.getAttribute("data-target");

    const updateCounter = () => {
      const count = +counter.textContent; // 현재 카운터 값 가져오기
      const increment = targetNum / 100; // 카운터 값을 점진적으로 증가시키기
      const nextCount = Math.ceil(count + increment);

      counter.textContent = nextCount > targetNum ? targetNum : nextCount; // 목표 숫자를 초과하지 않도록 설정

      if (count < targetNum) {
        requestAnimationFrame(updateCounter);
      }
    };

    gsap.to(".sub-project__add", {
      scrollTrigger: {
        trigger: ".sub-project",
        start: "bottom-=600 center",
        end: "bottom bottom",
        //markers: true,
        onEnter: () => {
          updateCounter();
        },
      },
    });
  });
}

// 4. Goal
function goal() {
  const mm = gsap.matchMedia();
  mm.add(
    {
      isDesktop: `(min-width: 1025px)`,
      isMobile: `(max-width:1024px)`,
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions;

      if (isDesktop) {
        const goalTl = gsap.timeline({
          defaults: { duration: 300 },
          scrollTrigger: {
            trigger: ".goal",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            //markers: true
          },
        });

        goalTl
          .to(".goal__item:nth-child(1)", { opacity: 0, delay: 1 })
          .to(".goal__item:nth-child(2)", { opacity: 1 }, "-=50%")
          .to(".goal__item:nth-child(2)", { opacity: 0, delay: 1 })
          .to(".goal__item:nth-child(3)", { opacity: 1 }, "-=50%");
      }
    }
  );
}

// 5. Contact
function contact() {
  const contactTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer__title-wrap",
      start: "-50% top",
      end: "center center",
      scrub: 1,
      //markers: true,
      refreshPriority: 0,
    },
  });

  contactTl
    .to(".footer__img-box", { scale: 0.2, duration: 1 }, "-=50%")
    .from(
      ".footer__title span:first-child",
      { xPercent: -100, duration: 1 },
      "<"
    )
    .from(
      ".footer__title span:last-child",
      { xPercent: 100, duration: 1 },
      "<"
    );
}

function scrollProcess() {
  $(window).scroll(function () {
    var wScroll = $(window).scrollTop();
    var dHeight = $(document).height();
    var wHeight = $(window).height();
    var innerHeight = $(window).innerHeight();
    var scrollHeight = $("body").prop("scrollHeight");

    var scrollPercent = (wScroll / (dHeight - wHeight)) * 100;
    var roundScroll = Math.round(scrollPercent);

    $(".scroll-progress__percent").text(roundScroll);
    //$(".scroll-bar").css("width", scrollPercent + "%");

    if (wScroll < 50) {
      gsap.to(".scroll__item", { yPercent: 0, duration: 0.5 });
    } else if (wScroll + innerHeight + 50 >= scrollHeight) {
      gsap.to(".scroll__item", { yPercent: -200, duration: 0.5 });
    } else {
      gsap.to(".scroll__item", { yPercent: -100, duration: 0.5 });
    }
  });
}

hero(); // 1
about(); // 2
project(); // 3
subProject(); // 3-2
goal(); // 4
contact(); //5
scrollProcess();
