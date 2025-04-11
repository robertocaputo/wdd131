const products = [
    { id: '1', name: 'Widget A' },
    { id: '2', name: 'Widget B' },
    { id: '3', name: 'Gadget C' },
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    const productSelect = document.getElementById('productName');
    products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  
    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', () => {
      const reviews = parseInt(localStorage.getItem('reviewCount')) || 0;
      localStorage.setItem('reviewCount', reviews + 1);
    });
  });  