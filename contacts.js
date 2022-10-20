const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

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

// Method Yang Menangani Pembacaan Contact
const loadContacts = () => {
    const fileData = JSON.parse(fs.readFileSync('data/contacts.json'));
    return fileData;
};

// Method Simpan Contact
const saveContact = (nama, email, ponsel) => {
    const objContact = {
        nama,
        email,
        ponsel,
    };

    // const fileData = JSON.parse(fs.readFileSync('data/contacts.json'));
    const contacts = loadContacts();

    // Cek Duplikat Data
    const duplicate = contacts.find((objContact) => objContact.nama === nama);
    if (duplicate) {
        console.info((chalk.red.inverse.bold("Kontak Sudah Terdaftar, Gunakan Nama Lain!")));
        return false;
    }

    // Cek Email (Valid / Tidak)
    if (email) {
        if (!validator.isEmail(email)) {
            console.info((chalk.red.inverse.bold("Email Tidak Valid!")));
            return false;
        }
    }

    // Cek Nomor HP
    if (!validator.isMobilePhone(ponsel, 'id-ID')) {
        console.info((chalk.red.inverse.bold("No Handhphone Tidak Valid!")));
        return false;
    }

    contacts.push(objContact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));

    console.info(chalk.green.inverse.bold(`Terimkasih ${nama} Sudah Menginputkan Data Anda!`));
}

// Method Menampilkan Seluruh Contact
const showContacts = () => {
    const contacts = loadContacts();

    console.info(chalk.cyan.inverse.bold(`Daftar Kontak Anda`));

    contacts.forEach((contact, i) => {
        console.info(`${i + 1}. ${contact.nama} - ${contact.email} - ${contact.ponsel}`);
    });
}

// Menampilkan Detail Contact
const showDetailContact = (nama) => {
    const contacts = loadContacts();

    // > Cek nama yang dimasukan dengan data di contacts.json
    const contact = contacts.find((contact) => {
        return contact.nama.toLowerCase() == nama.nama.toLowerCase();
    });

    // > Jika tidak ditemukan
    if (!contact) {
        console.info(chalk.red.inverse.bold(`${nama.nama} Tidak Ditemukan!`));
        return false;
    }

    // > Jika ditemukan
    console.info(chalk.cyan.inverse.bold(`${contact.nama}`));
    console.info(chalk.cyan.inverse.bold(`${contact.email}`));
    console.info(chalk.cyan.inverse.bold(`${contact.ponsel}`));
}

module.exports = {
    saveContact,
    showContacts,
    showDetailContact
};