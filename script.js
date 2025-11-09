//your code here
const baseImages = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg",
];

let images = [];
let selectedImages = [];

function randomizeTile() {
  images = [...baseImages];
  const duplicateIndex = Math.floor(Math.random() * baseImages.length);
  images.push(baseImages[duplicateIndex]);
}

function shuffleImages() {
  return [...images].sort(() => Math.random() - 0.5);
}

function displayImages() {
  const shuffled = shuffleImages();
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, i) => {
    tile.src = shuffled[i];
    tile.classList.remove("selected");
  });
  selectedImages = [];
  document.getElementById("reset").style.display = "none";
  document.getElementById("verify").style.display = "none";
  document.getElementById("para").innerText = "";
}

function handleImageClick(e) {
  const img = e.target;

  if (selectedImages.includes(img) || selectedImages.length >= 2) return;

  selectedImages.push(img);
  img.classList.add("selected");

  if (selectedImages.length === 1) {
    document.getElementById("reset").style.display = "inline-block";
  }

  if (selectedImages.length === 2) {
    document.getElementById("verify").style.display = "inline-block";
  }
}

function handleResetClick() {
  randomizeTile();
  displayImages();
}

function handleVerifyClick() {
  const [img1, img2] = selectedImages;

  if (img1.src === img2.src) {
    document.getElementById("para").innerText =
      "You are a human. Congratulations!";
  } else {
    document.getElementById("para").innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  document.getElementById("verify").style.display = "none";

  selectedImages.forEach((img) => img.classList.remove("selected"));
  selectedImages = [];
}

document.getElementById("reset").addEventListener("click", handleResetClick);
document.getElementById("verify").addEventListener("click", handleVerifyClick);
document.querySelectorAll(".tile").forEach((tile) => {
  tile.addEventListener("click", handleImageClick);
});

window.onload = () => {
  randomizeTile();
  displayImages();
};
