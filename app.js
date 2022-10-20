// Import Package
// > Yargs: membangun alat baris perintah interaktif, dengan menguraikan argumen dan menghasilkan antarmuka pengguna yang elegan.
const yargs = require('yargs');
// > Local Module 
const {
    saveContact,
    showContacts,
    showDetailContact,
    removeContact
} = require("./contacts");


// > Menggunakan Packages Yargs: Untuk Menambahkan Contact Baru
// => .command('cmd', 'description', builder(object/func), handler(func yang memberitahu ketika command di eksekusi))
yargs.command({
    command: 'add',
    description: 'Add New Contact',
    builder: {
        nama: {
            describe: "Full Name",
            demandOption: true,
            type: "string",
        },
        email: {
            describe: "Email",
            demandOption: true,
            type: "string",
        },
        ponsel: {
            describe: "Phone Number",
            demandOption: true,
            type: "string",
        }
    },
    handler: (argv) => {
        const contact = {
            nama: argv.nama,
            email: argv.email,
            ponsel: argv.ponsel,
        };

        saveContact(contact.nama, contact.email, contact.ponsel);
    }
}).demandCommand();

// > Menggunakan Packages Yargs: Menampilkan Daftar Kontak
yargs.command({
    command: 'show',
    description: 'Show All Contacts',
    handler: () => {
        showContacts();
    }
}).demandCommand();

// > Menggunakan Packages Yargs: Menampilkan Detail Kontak
yargs.command({
    command: 'detail',
    description: 'Show Detail Contacts Filter By Name',
    builder: {
        nama: {
            describe: "Full Name",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        showDetailContact(argv);
    }
}).demandCommand();

// > Menggunakan Packages Yargs: Menghapus Kontak
yargs.command({
    command: 'remove',
    description: 'Remove Contacts Filter By Name',
    builder: {
        nama: {
            describe: "Full Name",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        removeContact(argv);
    }
}).demandCommand();

// > Jalankan Yargs
yargs.parse();