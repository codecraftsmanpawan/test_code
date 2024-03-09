$(document).ready(function () {
  $(".btn-refresh-card").on("click", function () {
    var e = $(this).parents(".card");
    e.length &&
      (e.addClass("is-loading"),
      setTimeout(function () {
        e.removeClass("is-loading");
      }, 3e3));
  });

  var scrollbarDashboard = $(".sidebar .scrollbar");
  if (scrollbarDashboard.length > 0) {
    scrollbarDashboard.scrollbar();
  }

  var messageNotifScrollbar = $(".message-notif-scroll");
  if (messageNotifScrollbar.length > 0) {
    messageNotifScrollbar.scrollbar();
  }

  $(".scroll-bar").draggable();

  $("#search-nav").on("shown.bs.collapse", function () {
    $(".nav-search .form-control").focus();
  });

  var toggle_sidebar = false,
    toggle_quick_sidebar = false,
    toggle_topbar = false,
    minimize_sidebar = false,
    toggle_page_sidebar = false,
    toggle_overlay_sidebar = false,
    nav_open = 0,
    quick_sidebar_open = 0,
    topbar_open = 0,
    mini_sidebar = 0,
    page_sidebar_open = 0,
    overlay_sidebar_open = 0;

  if (!toggle_sidebar) {
    var toggle = $(".sidenav-toggler");

    toggle.on("click", function () {
      if (nav_open == 1) {
        $("html").removeClass("nav_open");
        toggle.removeClass("toggled");
        nav_open = 0;
      } else {
        $("html").addClass("nav_open");
        toggle.addClass("toggled");
        nav_open = 1;
      }
    });
    toggle_sidebar = true;
  }

  if (!toggle_topbar) {
    var topbar = $(".topbar-toggler");

    topbar.on("click", function () {
      if (topbar_open == 1) {
        $("html").removeClass("topbar_open");
        topbar.removeClass("toggled");
        topbar_open = 0;
      } else {
        $("html").addClass("topbar_open");
        topbar.addClass("toggled");
        topbar_open = 1;
      }
    });
    toggle_topbar = true;
  }

  if (!minimize_sidebar) {
    var minibutton = $(".toggle-sidebar");
    if ($(".wrapper").hasClass("sidebar_minimize")) {
      mini_sidebar = 1;
      minibutton.addClass("toggled");
      minibutton.html('<i class="las la-bars"></i>');
    }

    minibutton.on("click", function () {
      if (mini_sidebar == 1) {
        $(".wrapper").removeClass("sidebar_minimize");
        minibutton.removeClass("toggled");
        minibutton.html('<i class="las la-bars"></i>');
        mini_sidebar = 0;
      } else {
        $(".wrapper").addClass("sidebar_minimize");
        minibutton.addClass("toggled");
        minibutton.html('<i class="las la-bars"></i>');
        mini_sidebar = 1;
      }
      $(window).resize();
    });
    minimize_sidebar = true;
  }

  if (!toggle_overlay_sidebar) {
    var overlaybutton = $(".sidenav-overlay-toggler");
    if ($(".wrapper").hasClass("is-show")) {
      overlay_sidebar_open = 1;
      overlaybutton.addClass("toggled");
      overlaybutton.html('<i class="las la-bars"></i>');
    }

    overlaybutton.on("click", function () {
      if (overlay_sidebar_open == 1) {
        $(".wrapper").removeClass("is-show");
        overlaybutton.removeClass("toggled");
        overlaybutton.html('<i class="las la-bars"></i>');
        overlay_sidebar_open = 0;
      } else {
        $(".wrapper").addClass("is-show");
        overlaybutton.addClass("toggled");
        overlaybutton.html('<i class="las la-bars"></i>');
        overlay_sidebar_open = 1;
      }
      $(window).resize();
    });
    minimize_sidebar = true;
  }

  $(".sidebar").hover(
    function () {
      if ($(".wrapper").hasClass("sidebar_minimize")) {
        $(".wrapper").addClass("sidebar_minimize_hover");
      }
    },
    function () {
      if ($(".wrapper").hasClass("sidebar_minimize")) {
        $(".wrapper").removeClass("sidebar_minimize_hover");
      }
    }
  );

  // addClass if nav-item click and has subnav

  $(".nav-item").click(function () {
    $("li.active").removeClass("active");
    $(this).addClass("active");
  });

  //calandar datepicker
  $(function () {
    $("#datepicker").datepicker();
    $("#datepicker1").datepicker();
    $("#datepicker2").datepicker();
    $("#datepicker3").datepicker();
    $("#datepicker4").datepicker();
    $("#datepicker5").datepicker();
    $("#datepicker6").datepicker();
    $("#datepicker7").datepicker();
    $("#datepicker8").datepicker();
    $("#datepicker9").datepicker();
    $("#datepicker10").datepicker();
    $("#timepicker").timepicker();
    $("#timepicker2").timepicker();
  });

  $(function () {
    $("#example").DataTable();
    $("#example2").DataTable();
    $("#example3").DataTable();
    $("#example4").DataTable();
    $("#example5").DataTable();
    $("#example6").DataTable();
    $("#example7").DataTable();
    $("#example8").DataTable();
    $("#example9").DataTable();
    $("#example10").DataTable();
  });
});

// Top Pst slider-pot
$(".top_pst_slid").owlCarousel({
  nav: false,
  dots: false,
  loop: true,
  autoplay: true,
  mouseDrag: true,
  autoplayHoverPause: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: false,
    },
    600: {
      items: 2,
      nav: false,
      margin: 20,
    },
    1000: {
      items: 3,
      nav: false,
      loop: true,
      margin: 20,
    },
  },
});
