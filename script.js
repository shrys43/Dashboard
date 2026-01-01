/* ===============================
   DOM ELEMENTS
================================ */
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");
const sidebarToggle = document.getElementById("sidebarToggle");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const menuTexts = document.querySelectorAll(".menu-text");
const sidebarLogoText = document.getElementById("sidebarLogoText");
const toggleIconOpen = document.getElementById("toggleIconOpen");
const toggleIconClosed = document.getElementById("toggleIconClosed");

const profileButton = document.getElementById("profileButton");
const profileDropdown = document.getElementById("profileDropdown");

/* ===============================
   SIDEBAR CONSTANTS
================================ */
const EXPANDED_WIDTH = "w-64";
const COLLAPSED_WIDTH = "w-20";
const CONTENT_EXPANDED = "lg:ml-64";
const CONTENT_COLLAPSED = "lg:ml-20";

let isSidebarExpanded =
  localStorage.getItem("aviSidebar") !== "collapsed";

/* ===============================
   SIDEBAR FUNCTIONS
================================ */
function applySidebarState(expanded, mobile = false) {
  if (expanded) {
    sidebar.classList.remove(COLLAPSED_WIDTH);
    sidebar.classList.add(EXPANDED_WIDTH);

    if (!mobile) {
      mainContent.classList.remove(CONTENT_COLLAPSED);
      mainContent.classList.add(CONTENT_EXPANDED);
    }

    menuTexts.forEach((t) => t.classList.remove("hidden"));
    sidebarLogoText?.classList.remove("hidden");
    toggleIconOpen?.classList.remove("hidden");
    toggleIconClosed?.classList.add("hidden");
  } else {
    sidebar.classList.remove(EXPANDED_WIDTH);
    sidebar.classList.add(COLLAPSED_WIDTH);

    if (!mobile) {
      mainContent.classList.remove(CONTENT_EXPANDED);
      mainContent.classList.add(CONTENT_COLLAPSED);
    }

    menuTexts.forEach((t) => t.classList.add("hidden"));
    sidebarLogoText?.classList.add("hidden");
    toggleIconOpen?.classList.add("hidden");
    toggleIconClosed?.classList.remove("hidden");
  }
  lucide.createIcons();
}

function toggleSidebar() {
  isSidebarExpanded = !isSidebarExpanded;
  localStorage.setItem(
    "aviSidebar",
    isSidebarExpanded ? "expanded" : "collapsed"
  );
  applySidebarState(isSidebarExpanded);
}

/* ===============================
   MOBILE SIDEBAR
================================ */
function openMobileSidebar() {
  sidebar.classList.remove("-translate-x-full");
  sidebar.classList.add("translate-x-0");
  sidebarOverlay.classList.remove("hidden");
}

function closeMobileSidebar() {
  sidebar.classList.add("-translate-x-full");
  sidebar.classList.remove("translate-x-0");
  sidebarOverlay.classList.add("hidden");
}

/* ===============================
   PROFILE DROPDOWN
================================ */
let profileOpen = false;

function toggleProfileDropdown() {
  profileOpen = !profileOpen;
  if (profileOpen) {
    profileDropdown.classList.remove(
      "opacity-0",
      "scale-95",
      "pointer-events-none"
    );
    profileDropdown.classList.add("opacity-100", "scale-100");
  } else {
    profileDropdown.classList.add(
      "opacity-0",
      "scale-95",
      "pointer-events-none"
    );
    profileDropdown.classList.remove("opacity-100", "scale-100");
  }
}

/* ===============================
   EVENT LISTENERS
================================ */
sidebarToggle?.addEventListener("click", toggleSidebar);
mobileMenuButton?.addEventListener("click", openMobileSidebar);
sidebarOverlay?.addEventListener("click", closeMobileSidebar);

profileButton?.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleProfileDropdown();
});

document.addEventListener("click", (e) => {
  if (
    profileOpen &&
    !profileDropdown.contains(e.target) &&
    !profileButton.contains(e.target)
  ) {
    toggleProfileDropdown();
  }
});

/* ===============================
   INITIALIZE LAYOUT
================================ */
function initializeLayout() {
  if (window.innerWidth < 1024) {
    sidebar.classList.add("-translate-x-full");
    mainContent.classList.remove(CONTENT_EXPANDED, CONTENT_COLLAPSED);
    mainContent.classList.add("ml-0");
  } else {
    sidebar.classList.remove("-translate-x-full");
    applySidebarState(isSidebarExpanded);
  }
  lucide.createIcons();
}

window.addEventListener("resize", initializeLayout);

/* ===============================
   CHARTS (REPORTS)
================================ */
document.addEventListener("DOMContentLoaded", () => {
  initializeLayout();

  /* SALES BY DAY (SUN–SAT) */
  const salesChart = document.getElementById("salesChart");
  if (salesChart) {
    new Chart(salesChart, {
      type: "bar",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Sales (NPR)",
            data: [12000, 18000, 15500, 21000, 19500, 28000, 32000],
            backgroundColor: "rgba(37, 99, 235, 0.7)",
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

  /* PRODUCT CATEGORY PIE */
  const categoryChart = document.getElementById("popularDishesChart");
  if (categoryChart) {
    new Chart(categoryChart, {
      type: "doughnut",
      data: {
        labels: [
          "Electronics",
          "Fashion",
          "Grocery",
          "Home",
          "Beauty",
          "Others",
        ],
        datasets: [
          {
            data: [35, 25, 15, 10, 8, 7],
            backgroundColor: [
              "#2563eb",
              "#16a34a",
              "#f59e0b",
              "#9333ea",
              "#db2777",
              "#64748b",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }
});
