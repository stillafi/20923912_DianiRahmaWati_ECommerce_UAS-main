const addButtons = document.querySelectorAll(".btn-add");
const cartCountEl = document.getElementById("cart-count");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  let totalQty = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  cartCountEl.textContent = totalQty;
}

addButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);

    // ===== Simpan ke cart =====
    let product = cart.find(p => p.name === name);
    if (product) {
      product.quantity = (product.quantity || 0) + 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // ===== Animasi tombol hijau =====
    btn.classList.add("added");
    btn.textContent = "✔ Ditambahkan";
    setTimeout(() => {
      btn.classList.remove("added");
      btn.textContent = "Tambah ke Keranjang";
    }, 1200);

    // ===== Animasi terbang gambar =====
    const img = btn.closest(".product-card").querySelector("img");
    const flyImg = img.cloneNode(true);
    flyImg.classList.add("fly-img");
    document.body.appendChild(flyImg);

    const imgRect = img.getBoundingClientRect();
    const cartRect = document.getElementById("cart-btn").getBoundingClientRect();

    flyImg.style.left = imgRect.left + "px";
    flyImg.style.top = imgRect.top + "px";

    requestAnimationFrame(() => {
      flyImg.style.transform = `translate(${cartRect.left - imgRect.left}px, ${cartRect.top - imgRect.top}px) scale(0.1)`;
      flyImg.style.opacity = 0.5;
    });

    flyImg.addEventListener("transitionend", () => {
      flyImg.remove();
    });
  });
});

updateCartCount();
