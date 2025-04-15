document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error(`Section with id '${id}' not found.`);
    }
  }

  const itemsPerPage = 6;
  let currentPage = 1;

  function getStoredProperties() {
    return JSON.parse(localStorage.getItem("properties") || "[]");
  }

  function saveProperty(property) {
    const properties = getStoredProperties();
    properties.unshift(property);
    localStorage.setItem("properties", JSON.stringify(properties));
  }

  function displayProperties(page) {
    const allProperties = getStoredProperties();
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const visibleItems = allProperties.slice(start, end);

    const showcase = document.getElementById("showcase");
    if (!showcase) return;
    showcase.innerHTML = "";

    visibleItems.forEach((property) => {
      const item = document.createElement("div");
      item.className = "showcase-item";
      item.innerHTML = `
        <div class="property-container">
          <img src="${property.image}" alt="Property" class="property-image" />
          <div class="property-overlay">
            <span class="property-price">${property.price}</span>
            <button class="property-button">Visit</button>
          </div>
        </div>`;
      showcase.appendChild(item);
    });

    renderPagination(allProperties.length);
  }

  function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById("pagination");
    if (!pagination) return;
    pagination.innerHTML = "";

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = i === currentPage ? "active" : "";
      btn.onclick = () => {
        if (i !== currentPage) {
          currentPage = i;
          displayProperties(i);
        }
      };
      pagination.appendChild(btn);
    }
  }

  (function preloadProperties() {
    if (!localStorage.getItem("properties") || !Array.isArray(JSON.parse(localStorage.getItem("properties")))) {
      const defaultProperties = [
        {
          name: "Alice Johnson",
          email: "alice@example.com",
          price: "$250,000",
          image: "images/house1.WEBP",
        },
        {
          name: "Bob Smith",
          email: "bob@example.com",
          price: "$310,000",
          image: "images/house2.WEBP",
        },
        {
          name: "Carla Davis",
          email: "carla@example.com",
          price: "$180,000",
          image: "images/house3.WEBP",
        },
        {
          name: "Daniela Lopez",
          email: "daniela@example.com",
          price: "$275,000",
          image: "images/house4.WEBP",
        },
        {
          name: "Eric Miller",
          email: "eric@example.com",
          price: "$320,000",
          image: "images/house5.WEBP",
        },
        {
          name: "Fiona Brown",
          email: "fiona@example.com",
          price: "$220,000",
          image: "images/house6.WEBP",
        },
        {
          name: "George White",
          email: "george@example.com",
          price: "$390,000",
          image: "images/house7.WEBP",
        },
      ];
      localStorage.setItem("properties", JSON.stringify(defaultProperties));
    }
  })();

  const propertyForm = document.getElementById("propertyForm");
  if (propertyForm) {
    propertyForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const price = document.getElementById("price").value;
      const imageInput = document.getElementById("image");

      const confirmation = document.getElementById("confirmation");

      if (!name || !email || !price) {
        alert("Please fill in all required fields.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function () {
        const image = reader.result;
        saveProperty({ name, email, price: `$${price}`, image });

        confirmation.innerHTML = `
          <div class="confirmation-box">
            👋 Hello, <strong>${name}</strong>! Your property has been successfully added to the <strong>Blue</strong> platform! 🏠
          </div>`;
        propertyForm.reset();
        scrollToSection("confirmation");
        displayProperties(currentPage);
      };

      if (imageInput.files[0]) {
        reader.readAsDataURL(imageInput.files[0]);
      } else {
        saveProperty({
          name,
          email,
          price: `$${price}`,
          image: "images/no-image.webp",
        });

        confirmation.innerHTML = `
          <div class="confirmation-box">
            👋 Hello, <strong>${name}</strong>! Your property has been successfully added to the <strong>Blue</strong> platform! 🏠
          </div>`;
        propertyForm.reset();
        scrollToSection("confirmation");
        displayProperties(currentPage);
      }
    });
  }

  const agentForm = document.getElementById("agentForm");
  if (agentForm) {
    agentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const agentName = document.getElementById("agentName").value;
      const agentEmail = document.getElementById("agentEmail").value;

      const agentConfirmation = document.getElementById("agentConfirmation");

      if (!agentName || !agentEmail) {
        alert("Please fill in all required fields.");
        return;
      }

      agentConfirmation.innerHTML = `
        <div class="confirmation-box">
          👋 Welcome, <strong>${agentName}</strong>! You have been successfully registered as a real estate agent on the <strong>Blue</strong> platform! 🏡
        </div>`;
      agentForm.reset();
      scrollToSection("agentConfirmation");
    });
  }

  if (document.getElementById("showcase")) {
    displayProperties(currentPage);
  }
});