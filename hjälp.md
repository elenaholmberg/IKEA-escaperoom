//klistra in denna kod i console för att leta upp koordinater på en bild

document.getElementById('map').addEventListener('click', function(e) {
const rect = this.getBoundingClientRect();
const x = ((e.clientX - rect.left) / rect.width _ 100).toFixed(1);
const y = ((e.clientY - rect.top) / rect.height _ 100).toFixed(1);
console.log(`left: ${x}%  top: ${y}%`);
});
