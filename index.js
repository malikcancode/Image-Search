let accesskey = "BeMpql7_a5SYqcRAIOzfoIKwxTBRhMiI63RylCkkVNY";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");


formEl.addEventListener("click", function (event) {
  event.preventDefault();
  page = 1
  getImages();
})
showMoreButtonEl.addEventListener("click", function () {
  getImages();
})


let details = "";
let page = 1

async function getImages() {
  details = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${details}&client_id=${accesskey}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }
  const results = data.results;
  results.map((item) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = item.urls.small;
    image.alt = item.alt_description;
    let link = document.createElement("a");
    link.href = item.links.html;
    link.target = "_blank";
    link.textContent = item.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(link);
    searchResultsEl.appendChild(imageWrapper);

  });
  page++;
  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}
