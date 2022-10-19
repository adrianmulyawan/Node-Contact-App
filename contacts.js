const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Cek Folder "data/" Jika Tidak Ada Buat Folder-nya
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    // > Buat folder baru dengan nama sesuai dengan variable dirPath
    fs.mkdirSync(dirPath);
}

// Cek File "contacts.json" Jika Tidak Ada Buat File-nya
const fileName = './data/contacts.json';
if (!fs.existsSync(fileName)) {
    // > Buat file baru dengan nama sesuai dengan variable fileName
    // > Didalam method ini kita isikan:
    // => nama file, isi file, format teks
    fs.writeFileSync(fileName, "[]", "utf-8");
}

// Method Pertanyaan (Dibuat Menggunakan Promise)
const createQuestion = (question) => {
    return new Promise((resolve, reject) => {
        rl.question(question, (q) => {
            resolve(q);
        })
    });
};

// Method Simpan Contact
const saveContact = (nama, email, ponsel) => {
    const objContact = {
        nama,
        email,
        ponsel,
    };

    const fileData = JSON.parse(fs.readFileSync('data/contacts.json'));
    fileData.push(objContact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(fileData, null, 2));

    console.info(`Terimkasih ${nama} Sudah Menginputkan Data Anda!`);

    rl.close();
}

module.exports = {
    createQuestion,
    saveContact
};