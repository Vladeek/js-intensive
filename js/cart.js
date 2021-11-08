const cart = () => {
  const buttonCart = document.getElementById("cart-button");
  const modalCart = document.querySelector(".modal-cart");
  const buttonCloseCart = document.querySelector(".close");
  const body = modalCart.querySelector(".modal-body");
  const buttonSend = modalCart.querySelector(".button-primary");
  const clearCartButton = modalCart.querySelector(".clear-cart");
  const modalPriceTag = modalCart.querySelector(".modal-pricetag");

  const resetCart = () => {
    body.innerHTML = "";
    localStorage.removeItem("cart");
    modalCart.classList.remove("is-open");
  };

  const incrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));

    cartArray.map((item) => {
      if (item.id === id) {
        item.count = item.count > 0 ? item.count + 1 : 0;
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(cartArray));
    renderItems(cartArray);
  };

  const decrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));

    cartArray.map((item) => {
      if (item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0;
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(cartArray));
    renderItems(cartArray);
  };

  const renderItems = (data) => {
    body.innerHTML = "";
    data.forEach(({ name, price, id, count }) => {
      const newCartItem = document.createElement("div");
      newCartItem.classList.add("food-row");
      newCartItem.innerHTML = `<span class="food-name">${name}</span>
      <strong class="food-price">${price} ₽</strong>
      <div class="food-counter">
         <button class="counter-button btn-dec" data-index="${id}">-</button>
         <span class="counter">${count}</span>
         <button class="counter-button btn-inc" data-index="${id}">+</button>
      </div>`;
      body.append(newCartItem);
    });
  };

  clearCartButton.addEventListener("click", () => {
    resetCart();
  });

  buttonSend.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart");

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: cartArray,
    })
      .then((response) => {
        if (response.ok) {
          resetCart();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });

  body.addEventListener("click", (event) => {
    event.preventDefault();

    if (event.target.classList.contains("btn-inc")) {
      incrementCount(event.target.dataset.index);
    } else if (event.target.classList.contains("btn-dec")) {
      decrementCount(event.target.dataset.index);
    }
  });

  buttonCart.addEventListener("click", () => {
    if (localStorage.getItem("cart")) {
      renderItems(JSON.parse(localStorage.getItem("cart")));
    }
    modalCart.classList.add("is-open");
  });

  buttonCloseCart.addEventListener("click", () => {
    modalCart.classList.remove("is-open");
  });
};

cart();
