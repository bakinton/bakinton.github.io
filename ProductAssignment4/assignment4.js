
const productGrid = document.querySelector('.product-grid');
const progress = document.querySelector('.progress');
var modal = document.getElementById("myModal");
var dataImage = document.getElementById("img");
var dataName = document.getElementById("name");
var dataDescription = document.getElementById("description");
var dataPrice = document.getElementById("price");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}

function createProductCard(product, index) {
  setTimeout(function() {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    card.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = product.title;
    card.appendChild(title);

    const description = document.createElement('p');
    description.textContent = product.description;
    card.appendChild(description);

    const price = document.createElement('p');
    price.textContent = `Price: $${product.price.toFixed(2)}`;
    card.appendChild(price);

    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('details-btn');

    if (product.details) {
      detailsBtn.textContent = 'View Details';
      detailsBtn.disabled = false;
      detailsBtn.addEventListener('click', function() {
        fetch(product.details)
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            console.log(data);
            dataImage.src = data.image;
            dataName.innerHTML = data.title;
            dataDescription.innerHTML = data.description;
            dataPrice.innerHTML = data.price;

            modal.style.display = "block";
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    } else {
      detailsBtn.disabled = true;
    }

    card.appendChild(detailsBtn);

    productGrid.appendChild(card);
  }, index * 1000);
}

fetch('products.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    data.forEach(function(product, index) {
      createProductCard(product, index);
    });
  })
  .catch(function(error) {
    console.log(error);
  });

const images = productGrid.querySelectorAll('img');
let loadedImages = 0;

function updateProgress() {
  loadedImages++;
  const progressPercent = Math.floor((loadedImages / images.length) * 100);
  progress.style.width = `${progressPercent}%`;
}

images.forEach(function(img) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', img.src, true);
  xhr.responseType = 'blob';

  xhr.onload = function() {
    if (xhr.status === 200) {
      img.src = URL.createObjectURL(xhr.response);
      updateProgress();
      setTimeout(function() {
        img.style.opacity = 1;
      }, 1000);
    }
  };

  xhr.send();
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
