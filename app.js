// Import Local Modules
const {
    createQuestion,
    saveContact
} = require('./contacts');

// Method Utama
const main = async () => {
    const nama = await createQuestion("Masukan Nama Anda: ");
    const email = await createQuestion("Masukan Email Anda: ");
    const ponsel = await createQuestion("Masukan No Handphone Anda: ");

    saveContact(nama, email, ponsel);
};

main();