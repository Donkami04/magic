// const { Sequelize } = require('sequelize');
// const { config } = require('../config/config');


// // Crear una instancia de Sequelize con la configuración SSL
// const sequelize = new Sequelize('defaultdb', 'avnadmin', 'AVNS_aunycxTV5QWYo08va_b', {
//     host: 'pg-12255df1-marketplace-db.h.aivencloud.com',
//     port: 18570,
//     dialect: 'postgres',
//     logging: config.isProd ? false : true,
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: true,
//             ca: `-----BEGIN CERTIFICATE-----
// MIIEQTCCAqmgAwIBAgIUWcj/EOL7o38W4kuSpIerGq16l3IwDQYJKoZIhvcNAQEM
// BQAwOjE4MDYGA1UEAwwvYzllMTQ4YzMtNTRiYS00OTM5LWIyN2EtNzFkM2U3YmNk
// ODE0IFByb2plY3QgQ0EwHhcNMjQxMDA2MDkwNTM1WhcNMzQxMDA0MDkwNTM1WjA6
// MTgwNgYDVQQDDC9jOWUxNDhjMy01NGJhLTQ5MzktYjI3YS03MWQzZTdiY2Q4MTQg
// UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBANgu8Yuj
// YwKK2f+k7QIuMzAenFvNR6zJs11TIkwn9RRAlCx3umBXlHNp8tS52RoYau22Yfke
// L7gcKoV+ov0Nj+nNtuPRRbmArg0+nZWIoC21tIS/+A7NhhXmLSsM8RRuKc1CH4V7
// N16FwoAmgREC66N4yC3AlR9oIirnaXSesWOfZFhFsN+hkn2bZDdZRg6z+sLg8Ifi
// vQ+BBMKCZLW7cMKfVVTHnVN5jzJUTrY6rpR2+4N1gj59vZQMmI6oVcpLNZ2ebfjM
// 4xtC6zbw658N/SnVYNDldhPDaYZVcDjc7f5QFMGt1CQXC1zo8cB1h61TF6AuHLai
// 6fNYGMB1AhJBOywos9qUv99sVTgH94qJjvGacmgx/P3tUfELSbca1CpKvsi/tbDD
// PNQdVVRWBnOB9+luxfCHcU7zjpneSNmMcU74mBHFSQvO6eTcRGXV/cL0qY58iAJy
// Q0zRBqWNkqEp+MHSFf6ODfsvKXIKrLUrcrAH7S9snr//ueAQQAOMX3CzNQIDAQAB
// oz8wPTAdBgNVHQ4EFgQUWBYR4lcQ4qK7lhAwIEG2Y0/+rJwwDwYDVR0TBAgwBgEB
// /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAAZBkbsYaShBdZ2R
// 6zAkptwWjkvjbU2ao0R0HqT5nQW438kmkBZU/bq6dQSG3978PiqVyVcVrDYC50s1
// OLafRmgg9JgX0VkkJeijJx24t0ZBVn78FrL8pEZ4tOhtp43J8DcKE7kXew143gQ9
// 51nmxEiqM793gvmS7Kf1LnEx+21KHd6D4HVRwU9Cq+63tQhPBV2f6a4kWPRy4xtC
// GlBxOkDNNUMPO4iZmryNOnJeIbF2gglMZrjtTSjNs5hmpu3vy+ZYZf7iRvlE7iWZ
// ZEntIkv2q8c0jUMPBdi+TOMkVmPUo3jJEqdFMp9Yn4i0m9pqvYNN+b8nZXf58BV8
// McViG0YKuHADQBKCi32YmATTvk4N58+KivxsDnJkViRCeM9FSwWfOyYcAX+l34zx
// 6fla7olxhEkUEVNU+pKkoLtRPjq9UCdASph8YXb/q5b6sLTwY4lJMlkWiw34IwLM
// AeeGBFm3nLQqs7uyjv7eHXxLRNOnqWOknTp4wxwRp49YUN3eGg==
// -----END CERTIFICATE-----`
//         }
//     },
// });

// // Probar la conexión
// sequelize.authenticate()
//     .then(() => {
//         console.log('Conexión a la base de datos de PRODUCCION exitosa.');
//     })
//     .catch(err => {
//         console.error('Error al conectar con la base de datos:', err);
//     });

// module.exports = sequelize;