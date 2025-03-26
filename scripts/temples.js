const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');

menuButton.addEventListener('click', () => {
  const isVisible = navMenu.style.display === 'block';
  navMenu.style.display = isVisible ? 'none' : 'block';
  menuButton.textContent = isVisible ? '☰' : '✖';
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;