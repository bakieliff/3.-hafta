function kalanSure(targetDate) {
  var simdi = new Date();
  var hedef = new Date(targetDate);
  var fark = (hedef - simdi) / 1000;

  return {
    gun: Math.floor(fark / 3600 / 24),
    saat: Math.floor((fark / 3600) % 24),
    dakika: Math.floor((fark / 60) % 60),
    saniye: Math.floor(fark % 60),
    total: fark,
  };
}

function animasyon(span) {
  span.className = "flip";
  setTimeout(() => {
    span.className = "";
  }, 700);
}

function geriSayimBaslat(id, dogumTarihi) {
  var interval = setInterval(() => {
    var kutu = document.getElementById(id);
    var kalan = kalanSure(dogumTarihi);

    kutu.innerHTML =
      "<span>" + kalan.gun + "</span>" +
      "<span>" + kalan.saat + "</span>" +
      "<span>" + kalan.dakika + "</span>" +
      "<span>" + kalan.saniye + "</span>";

    var spans = kutu.getElementsByTagName("span");
    animasyon(spans[3]);
    if (kalan.saniye == 59) animasyon(spans[2]);
    if (kalan.dakika == 59 && kalan.saniye == 59) animasyon(spans[1]);
    if (kalan.saat == 23 && kalan.dakika == 59 && kalan.saniye == 59) animasyon(spans[0]);

    if (kalan.total < 1) {
      clearInterval(interval);
      kutu.innerHTML = "<span>0</span><span>0</span><span>0</span><span>0</span>";
    }
  }, 1000);
}

// Örnek: Elif'in doğum günü 15 Kasım ise
window.onload = function () {
  var dogumGunu = new Date("15 Nov 2025 00:00:00");
  geriSayimBaslat("clock", dogumGunu);
};