const navBar = document.getElementById("navbar__list");
const showMore = document.getElementById("show-more");
const navbarItems = navBar.getElementsByClassName("navbar__item");

const gallery = document.getElementById('gallery')
const fragment = document.createDocumentFragment()

const searchBtn = document.getElementById("search")
const imput = document.getElementById("navbar__imput")

const clientId = "&client_id=IfN-L8JK5qNpABCzhE_FKhkR1JOvLLnHqzfdWVoeC5c"

let page = 1;
let topic = "all"

// const url = `https://api.unsplash.com/photos?page=${page}${clientId}`

document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("header").classList.toggle("is-active");
  header.classList.toggle("header--active");
});

searchBtn.addEventListener("click", () => {
  (imput.classList != "navbar__imput--active")
  ? imput.classList.add("navbar__imput--active")
  : topic = imput.textContent
})

for (let i = 0; i < navbarItems.length; i++) {
  navbarItems[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("navbar__item--active");
    current[0].className = current[0].className.replace("navbar__item--active");
    header.classList.toggle("header--active");
    this.className += " navbar__item--active";
  });
}

const gridView = document.getElementById("grid-icon")
  .addEventListener("click", () => {
    if (gallery.classList.contains("gallery--inline")) gallery.classList.remove("gallery--inline")
  });

const listView = document.getElementById("list-icon")
  .addEventListener("click", () => {
    if (gallery.classList != "gallery--inline") gallery.classList.add("gallery--inline")
  });

const fetchImgs = (res,firstColumn) => {
  firstColumn = document.getElementById('first-column')
  const secondColumn = document.getElementById('second-column')
  const thirdColumn = document.getElementById('third-column')

  for (const photoInfo of res.data.results) {
    const link = document.createElement('FIGURE')
    link.className = 'gallery__link'
    link.href = 'gallery__link'

    const photo = document.createElement('IMG')
    photo.src = photoInfo.urls.regular
    photo.alt = photoInfo.alt_description
    photo.className = 'gallery__img'

    link.appendChild(photo)

    let dataIndex = res.data.results.indexOf(photoInfo)

    if (dataIndex % 3 == 0) firstColumn.appendChild(link)
    else if (dataIndex % 2 == 0) thirdColumn.appendChild(link)
    else secondColumn.appendChild(link)
  }
  gallery.appendChild(fragment)
  page++
}

const loadImgs = () => {
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${topic}${clientId}`
  axios({
    url: url
  }).then(fetchImgs)
  .catch(console.log)
  console.log(url)
}

for (let i = 0; i < navbarItems.length; i++) {
  navbarItems[i].addEventListener('click', printDetails);
}

function printDetails(res) {
  topic = this.textContent
  loadImgs(res)
  return page = 0
}

showMore.addEventListener('click', loadImgs)

loadImgs()
