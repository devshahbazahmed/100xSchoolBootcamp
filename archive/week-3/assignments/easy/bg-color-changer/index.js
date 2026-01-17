function changeColor(colorName) {
  const color = document.getElementById(colorName).innerHTML;
  console.log(color);
  document.querySelector("body").style.backgroundColor = color;
}
