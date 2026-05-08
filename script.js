let permainanBerjalan = true; // permainan berhenti bila ada pemenang
let giliran = "giliranX"; // bergantian pemain X dna O
let dataPionX = [];
let dataPionO = [];
let dataKemenangan = [
    ["kotak-1", "kotak-2", "kotak-3"], ["kotak-4", "kotak-5", "kotak-6"], ["kotak-7", "kotak-8", "kotak-9"], // horizontal
    ["kotak-1", "kotak-4", "kotak-7"], ["kotak-2", "kotak-5", "kotak-8"], ["kotak-3", "kotak-6", "kotak-9"], // vertikal
    ["kotak-1", "kotak-5", "kotak-9"], ["kotak-3", "kotak-5", "kotak-7"] // diagonal
];

// menggambar pion awal game
if (giliran === "giliranX"){
    document.getElementById("giliranPion").innerHTML = "X";
}else{
    document.getElementById("giliranPion").innerHTML = "O";
}

function klikKotak(id){
  let isiKotak = document.getElementById(id).innerHTML;
  if (permainanBerjalan && (isiKotak === "")){
    // menambah pion ke kotak
    if (giliran === "giliranX"){
        document.getElementById(id).innerHTML = "X";
        document.getElementById(id).style.color = "black";
        giliran = "giliranO";
        dataPionX.push(id);

        // menghapus pion X yang pindah
        if (dataPionX.length === 4){
            document.getElementById(dataPionX[0]).innerHTML = "";
            dataPionX.shift();

        }
        // cek kemenangan X
        let dataCekKemenanganX = [...dataPionX];
        dataCekKemenanganX.sort();

        for (let item of dataKemenangan){
            if (item[0] === dataCekKemenanganX[0] && item[1] === dataCekKemenanganX[1] && item[2] === dataCekKemenanganX[2]){
                document.getElementById("giliranPion").innerHTML = "X MENANG";
                permainanBerjalan = false;
                // console.log("X MENANG");
                return;
            }
        };
        

        // menandai pion O yang akan pindah
        if (dataPionO.length === 3){
            document.getElementById(dataPionO[0]).style.color = "red";
        }
    }else{
        document.getElementById(id).innerHTML = "O";
        document.getElementById(id).style.color = "black";
        giliran = "giliranX";
        dataPionO.push(id);

        // menghapus pion O yang pindah
        if (dataPionO.length === 4){
            document.getElementById(dataPionO[0]).innerHTML = "";
            dataPionO.shift();

        }
        // cek kemenangan O
        let dataCekKemenanganO = [...dataPionO];
        dataCekKemenanganO.sort();
        for (let item of dataKemenangan){
            if (item[0] === dataCekKemenanganO[0] && item[1] === dataCekKemenanganO[1] && item[2] === dataCekKemenanganO[2]){
                document.getElementById("giliranPion").innerHTML = "O MENANG";
                permainanBerjalan = false;
                // console.log("O MENANG")
                return;
            }
        };


        // menandai pion X yang akan pindah
        if (dataPionX.length === 3){
            document.getElementById(dataPionX[0]).style.color = "red";
        }
    }
    // menggambar giliran pion
      if (giliran === "giliranX"){
          document.getElementById("giliranPion").innerHTML = "X";
      }else{
          document.getElementById("giliranPion").innerHTML = "O";
      }
  }
//   console.log("X: " + dataPionX);
//   console.log("O: " + dataPionO);
};

// riset permainan
function risetPermainan(namaKelas){
    // mengambil semua element dengan class kotak
    let daftarKotak = document.querySelectorAll(".kotak");

    // perulangan untuk setiap kotak
    daftarKotak.forEach(function(kotak){
        kotak.innerHTML = "";
        dataPionO = [];
        dataPionX = [];
        permainanBerjalan = true;
        if(giliran === "giliranX"){
            pion = "X";
        }else{
            pion = "O"
        }
        document.getElementById("giliranPion").innerHTML = pion;
    })
}