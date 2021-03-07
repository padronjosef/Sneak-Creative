const navBarHeader = document.getElementById("navbar-header");
const navBarHeaderItems = navBarHeader.getElementsByClassName("navbar__item");

const navBar = document.getElementById("navbar__list");
const navBarLink = navBar.getElementsByClassName("navbar__link");

const navBarItems = navBar.getElementsByClassName("navbar__item");

const hamburger = document.getElementById("hamburger");
const header = document.getElementById("header");

const gridView = document.getElementById("grid-icon");
const listView = document.getElementById("list-icon");

const gallery = document.getElementById("gallery");
const showMore = document.getElementById("show-more");

const searchIcon = document.getElementById("search__icon");
const searchImput = document.getElementById("search__imput");

// variable for pagination
let page = 1;

// variable for search topic
let topic = "all";


// fade in animation to make everything smoother
const fadeInAnimation = () => {
  gallery.classList.add("fade-in");
  setTimeout(() => {
    gallery.classList.remove("fade-in");
  }, 2000);
};

// Mobile menu logic
const toggleMobileMenu = () => {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    header.classList.toggle("header--active");
  });
};

const closeMobileMenu = () => {
  if (header.classList.contains("header--active"))
    header.classList.remove("header--active");
};

// navbar logic
const activeGalleryButtons = () => {
  for (let i = 0; i < navBarLink.length; i++) {
    navBarLink[i].addEventListener("click", (e) => {
      animateMenuButtons(e);
      searchByMenuButtons(e);
    });
  }
};

const activeHeaderButtons = () => {
  for (let i = 0; i < navBarHeaderItems.length; i++) {
    navBarHeaderItems[i].addEventListener("click", (e) => {
      closeMobileMenu();
      searchByMenuButtons(e);
    });
  }
};

const animateMenuButtons = (e) => {
  let itemActive = document.getElementsByClassName("navbar__link--active");

  itemActive[0].className = itemActive[0].className.replace(
    "navbar__link--active",
    "navbar__link"
  );
  e.target.className = "navbar__link--active";
};

const searchByMenuButtons = (res) => {
  topic = res.target.innerText;
  page = 0;
  page++;
  deleteImgs();
  fetchDataFromApi();
};

// search imput logic
const scrollToGallery = () => (document.location.href = "#gallery");

const searchByImputButton = () => {
  searchImput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      topic = e.target.value;
      page = 0;
      deleteImgs();
      fetchDataFromApi();
      closeMobileMenu();
      scrollToGallery();
    }
  });
};

const toggleSearchIcon = () => {
  searchIcon.addEventListener("click", () =>
    searchImput.classList.toggle("search__imput--active")
  );
};

// gallery views logic
const activeGridView = () => {
  gridView.addEventListener("click", () => {
    if (gallery.classList.contains("gallery--inline"))
      gallery.classList.remove("gallery--inline");
    fadeInAnimation();
  });
};

const activeListView = () => {
  listView.addEventListener("click", () => {
    if (gallery.classList.contains("gallery--inline") == false)
      gallery.classList.add("gallery--inline");
    fadeInAnimation();
  });
};

// gallery logic
const renderImgs = (
  res,
  photoInfo,
  firstColumn,
  secondColumn,
  thirdColumn,
  fragment
) => {
  const link = document.createElement("A");
  link.className = "gallery__link";
  link.href = photoInfo.links.html;
  link.target = "_blank";
  link.rel = "rel='noreferrer'";

  const photo = document.createElement("IMG");
  photo.src = photoInfo.urls.small;
  photo.alt = photoInfo.alt_description;
  photo.className = "gallery__img";

  link.appendChild(photo);

  let dataIndex = res.results.indexOf(photoInfo);

  if (dataIndex % 3 == 0) firstColumn.appendChild(link);
  else if (dataIndex % 2 == 0) secondColumn.appendChild(link);
  else thirdColumn.appendChild(link);

  gallery.appendChild(fragment);
};

const renderNotFound = () => {
  const link = document.createElement("FIGURE");
  link.className = "gallery__link";

  const photo = document.createElement("IMG");
  photo.src = "./assets/icons/not-found.png";
  photo.alt = "not found";
  photo.className = "gallery__img";

  link.appendChild(photo);
  gallery.appendChild(link);
  gallery.classList.add("gallery--inline");
};

const deleteImgs = () => {
  let img = document.getElementsByClassName("gallery__link");
  while (img.length > 0) {
    img[0].parentNode.removeChild(img[0]);
  }
};

const ImgOrganizer = (res) => {
  const firstColumn = document.getElementById("first-column");
  const secondColumn = document.getElementById("second-column");
  const thirdColumn = document.getElementById("third-column");
  const fragment = document.createDocumentFragment();

  fadeInAnimation();

  for (const photoInfo of res.results.slice(0, 9))
    renderImgs(
      res,
      photoInfo,
      firstColumn,
      secondColumn,
      thirdColumn,
      fragment
    );

  if (res.results.length == 0) renderNotFound();
  page++;
};

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        xhttp.status === 200
          ? resolve(JSON.parse(xhttp.responseText))
          : reject(new Error("Error", url));
      }
    };
    xhttp.send();
  });
};

const fetchDataFromApi = () => {
  const clientId = "&client_id=IfN-L8JK5qNpABCzhE_FKhkR1JOvLLnHqzfdWVoeC5c";
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${topic}${clientId}`;
  fetchData(url)
    .then(ImgOrganizer)
    .catch(console.log);
};

const loadMoreImg = () => {
  if (showMore) showMore.addEventListener("click", fetchDataFromApi);
};

toggleMobileMenu();
activeGalleryButtons();
activeHeaderButtons();
searchByImputButton();
toggleSearchIcon();
activeGridView();
activeListView();
fetchDataFromApi();
loadMoreImg();
