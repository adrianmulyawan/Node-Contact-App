const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukan Nama: ', (nama) => {
    rl.question('Masukan Nomor Ponsel: ', (ponsel) => {
        const objContact = {
            nama, 
            ponsel,
        };

        const fileData = JSON.parse(fs.readFileSync('data/contacts.json'));
        fileData.push(objContact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(fileData, null, 2));

        console.info(`Terimkasih ${nama} Sudah Menginput No Ponsel ${ponsel}`);

        rl.close();
    });
});