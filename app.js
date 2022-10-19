// Import Package
// > Yargs: membangun alat baris perintah interaktif, dengan menguraikan argumen dan menghasilkan antarmuka pengguna yang elegan.
const yargs = require('yargs');
// > Local Module 
const { saveContact } = require("./contacts");


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
});

// > Jalankan Yargs
yargs.parse();