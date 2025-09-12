document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTableBody = document.querySelector("#cart-table tbody");
  const grandTotalEl = document.getElementById("grand-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  function renderCart() {
    cartTableBody.innerHTML = "";
    let grandTotal = 0;
    cart.forEach((item, index) => {
      const row = document.createElement("tr");
      const itemTotal = item.price * item.quantity;
      grandTotal += itemTotal;
      row.innerHTML = `
        <td>${item.name}</td>
        <td>Rp${item.price.toLocaleString("id-ID")}</td>
        <td>
          <button class="decrease" data-index="${index}">-</button>
          <span class="qty">${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </td>
        <td>Rp${itemTotal.toLocaleString("id-ID")}</td>
        <td><button class="remove" data-index="${index}">Hapus</button></td>
      `;
      cartTableBody.appendChild(row);
    });
    grandTotalEl.textContent = grandTotal.toLocaleString("id-ID");
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Event untuk +, -, hapus
  cartTableBody.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("increase")) {
      cart[index].quantity += 1;
    } else if (e.target.classList.contains("decrease")) {
      cart[index].quantity -= 1;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    } else if (e.target.classList.contains("remove")) {
      cart.splice(index, 1);
    }
    renderCart();
  });

  // Tombol Checkout via WhatsApp
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }
    let pesan = "Halo, saya mau pesan:\n\n";
    let grandTotal = 0;
    cart.forEach(item => {
      let subtotal = item.price * item.quantity;
      grandTotal += subtotal;
      pesan += `- ${item.name} (${item.quantity}x) = Rp${subtotal.toLocaleString("id-ID")}\n`;
    });
    pesan += `\nTotal Keseluruhan: Rp${grandTotal.toLocaleString("id-ID")}`;

    // Nomor WhatsApp tujuan
    let nomor = "62882000196113";
    let url = `https://wa.me/${62882000196113}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
  });

  renderCart();
});
