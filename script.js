// === inisiasi awal ===
let gameBerjalan = true;
giliran = "X";
let dataX = [];
let dataO = [];
let pemenang;
let modePermainan; // defaoult mode permainan
gantiMode();
let kumpulanKotak = [
    "kotak-1","kotak-2","kotak-3",
    "kotak-4","kotak-5","kotak-6",
    "kotak-7","kotak-8","kotak-9"
];
let kumpulanKombinasiMenang = [
    ["kotak-1","kotak-2","kotak-3"],["kotak-4","kotak-5","kotak-6"],["kotak-7","kotak-8","kotak-9"], // horizontak
    ["kotak-1","kotak-4","kotak-7"],["kotak-2","kotak-5","kotak-8"],["kotak-3","kotak-6","kotak-9"], // vertikal
    ["kotak-1","kotak-5","kotak-9"],["kotak-3","kotak-5","kotak-7"]  // diagonal
];
// tampilan giliran awal game
document.getElementById("giliranPion").innerHTML = giliran

// === update display ===
function updateDisplay(){
    // 1. menghapus semua isi kotak
    document.querySelectorAll(".kotak").forEach(kotak=>{
        kotak.innerHTML = "";
        kotak.style.color = "black";
    })
    
    // 2. menggambar X
    for (let item of dataX){
        document.getElementById(item).innerHTML = "X";
    }
    
    // 3. menggambar O
    for (let item of dataO){
        document.getElementById(item).innerHTML = "O";
    }

    // 4. giliran pion
    document.getElementById("giliranPion").innerHTML = giliran;

    // 5. mengubah warna pion yang akan hilang
    if (dataX.length !== 3 || dataO.length !== 3 || !gameBerjalan){
        return
    }

    if (giliran === "X"){
        document.getElementById(dataX[2]).style.color = "red";
    }else{
        document.getElementById(dataO[2]).style.color = "red";
    }
};

// === logika game ===
function logikaGame(cekGiliran){
    // 1. menghapus posisi pion kedaluarsa dan mengganti giliran
    if (cekGiliran === "X"){
        dataX.splice(3); // menghapus
        giliran = "O";
    }else{
        dataO.splice(3);
        giliran = "X";
    }

    // 2. memeriksa kemenangan
    if (giliran !== "X"){
        cekDataMenang = [...dataX].sort();
        pemenang = "X MENANG"
    }else{
        cekDataMenang = [...dataO].sort();
        pemenang = "O MENANG"
    }
    for (let item of kumpulanKombinasiMenang){
        if (item[0] === cekDataMenang[0] && item[1] === cekDataMenang[1] && item[2] === cekDataMenang[2]){
            giliran = pemenang
            gameBerjalan = false
        }
    };
    if (giliran === "O" && modePermainan == "vsBot"){
        gameBerjalan = false
        setTimeout(() => {botO();}, 400);
        gameBerjalan = true
    }
};

// BOT untuk pion O mengutamakan kemenangan sendiri
function botO(){
    // kotak kosong
    let kotakIsi = dataX.concat(dataO);
    let kotakKosong = kumpulanKotak.filter(item => !kotakIsi.includes(item));

    // O
    // kotak langkah kemenangan O
    let langkahKemenanganOMentah = kumpulanKombinasiMenang.filter(subArray => dataO.slice(0, 2).every(elemen => subArray.includes(elemen))).flat();
    // console.log(langkahKemenanganOMentah);
    let langkahKemenanganO = [...new Set(langkahKemenanganOMentah)];
    console.log(langkahKemenanganO);

    // kotakDipilih = kotak kosong irisan dengan kotang langkah kemenangan O; jika tidak ada
    let langkahKemenanganOMasihKosong = kotakKosong.filter(item => langkahKemenanganO.includes(item));

    // X
    // kotak langkah kemenangan x
    let langkahKemenanganXMentah = kumpulanKombinasiMenang.filter(subArray => dataX.slice(0, 2).every(elemen => subArray.includes(elemen))).flat();
    let langkahKemenanganX = [...new Set(langkahKemenanganXMentah)];

    // kotakDipilih = kotak kosong irisan dengan kotang langkah kemenangan O; jika tidak ada
    let langkahKemenanganXMasihKosong = kotakKosong.filter(item => langkahKemenanganX.includes(item));

    if (langkahKemenanganXMasihKosong.length > 0 && langkahKemenanganOMasihKosong.length !== 1){
        kemungkinanKotak = langkahKemenanganXMasihKosong;
    }else if (langkahKemenanganOMasihKosong.length > 0){
        kemungkinanKotak = langkahKemenanganOMasihKosong;
    }else{
        kemungkinanKotak = kotakKosong;
    }

    // pilih acak kotak kosong
    kotakKosongDipilih = kemungkinanKotak[Math.floor(Math.random()* kemungkinanKotak.length)];
    dataO.unshift(kotakKosongDipilih);
    logikaGame();
    updateDisplay();
};


// === menangani event ===

// klik kotak
function klikKotak(id){
    let isiKotak = document.getElementById(id).innerHTML
    if (!gameBerjalan || isiKotak !== ""){
        return; // bila kotak sudah terisi atau game berhenti(menang) maka tidak bisa update data dan display
    }
    if (giliran === "X"){
        dataX.unshift(id); // menambah data
    } else{
        dataO.unshift(id); 
    }
    logikaGame(giliran);
    updateDisplay();
    // console.log("X: " + dataX)
    // console.log("O: " + dataO)
};

// tombol riser
function risetPermainan(){
    dataX = [];
    dataO = [];
    gameBerjalan = true;
    if (giliran === "X MENANG" || giliran === "O"){
        giliran = "O";
        botO();
    }else{
        giliran = "X";
    }
    updateDisplay();
};

// tombol ganti mode permainan
function gantiMode(){
    modePermainan = document.getElementById("modePermainan").value;
    risetPermainan();
};
