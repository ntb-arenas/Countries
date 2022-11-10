const galaxy1 = [
  {
    name: "Andromeda Galaxy",
    age: 10.01,
    constellation: "Andromeda",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-33a-07.jpg/1920px-ESO-VLT-Laser-phot-33a-07.jpg",
  },
  {
    name: "Milky Way Galaxy",
    age: 13.61,
    constellation: "Sagittarius",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Andromeda_Galaxy_560mm_FL.jpg/1280px-Andromeda_Galaxy_560mm_FL.jpg",
  },
];

document.querySelector(".img-js").setAttribute("src", galaxy1.img);
document.querySelector(".gal-name-js span").innerHTML = galaxy1.name;
document.querySelector(".gal-constellation-js span").innerHTML = galaxy1.constellation;
document.querySelector(".gal-age-js span").innerHTML = galaxy1.age;
