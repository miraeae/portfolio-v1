gsap.registerPlugin(ScrollTrigger);

// 사이트 부드럽게 스크롤
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 500);
});

gsap.ticker.lagSmoothing(0);

// Gnb 링크 이동
$(".gnb__item > a, .gnb-mobile__item > a").click(function () {
  $("html, body").animate({ scrollTop: $(this.hash).offset().top }, 800);
  return false;
});

// Gnb Mobile
const gnbTl = gsap.timeline({ paused: true });

gnbTl
  .to(".gnb-mobile", 0.4, {
    height: "auto",
    duration: 0.2,
    ease: "power1.inOut",
  })
  .from(".gnb-mobile li", { yPercent: 100, opacity: 0, stagger: 0.1 });

$(".gnb-trigger").click(function () {
  $(this).toggleClass("active");
  $(this).attr("aria-label", "메뉴 닫기");
  $(this).attr("aria-expanded", "true");

  if ($(this).hasClass("active")) {
    gnbTl.play();
  } else {
    gnbTl.reverse();
    $(this).attr("aria-label", "메뉴 열기");
    $(this).attr("aria-expanded", "false");
  }
});

// Cursor
$(document).mousemove(function (e) {
  gsap.to(".cursor", {
    opacity: 1,
    duration: 0.3,
    left: e.pageX,
    top: e.pageY,
  }); //e.clientX
  gsap.to(".cursor-more", {
    duration: 1,
    left: e.pageX + 15,
    top: e.pageY + 15,
  });

  $("a, [class*=btn], .gnb-trigger, .modal__toggle").hover(
    function () {
      e.preventDefault();
      $(".cursor").addClass("active");
    },
    function () {
      $(".cursor").removeClass("active");
    }
  );

  $("[class$=project__item-link], .project__item-link--overlay").hover(
    function () {
      e.preventDefault();
      $(".cursor").removeClass("active");
      $(".cursor-more").addClass("active");
    },
    function () {
      $(".cursor").removeClass("active");
      $(".cursor-more").removeClass("active");
    }
  );
});

// Top Button
$(".top-btn").click(function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 500);
  return false;
});

// 빈 클릭 방지
$("a[href='#']").click(function (e) {
  e.preventDefault();
});
