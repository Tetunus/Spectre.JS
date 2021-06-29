
/////////////////////////////////////////////////////////////////////
//                                                                 //
//  File: Spectre.js                                               //
//  Author: Tetunus (Josh)                                         //
//  Version: 0.0.1                                                 //
//  Description: The main components and core code for the         //
//               Spectre inter-process communication components.   //
//                                                                 //
/////////////////////////////////////////////////////////////////////

'use strict';

const net = require('net');

const Port = 8888;
const Encrypted = true;

const server = net.createServer((socket) =>
{
    socket.on('data', (data) =>
    {
        if (data.toString() == "exit")
        {
            console.log(`[Spectre -> Debug] Stopping server..`);
            socket.end();
            console.log(`[Spectre -> Debug] Server stopped.`);
        }

        if (Encrypted)
        {
            let new_data = Buffer.from(data.toString(), 'base64').toString();

            console.log(`[Spectre -> Debug] ${socket.remoteAddress} - Data Recieved - ${new_data.length} (Encrypted)`);

            // Process the data here, the variable holding that data is "new_data"
        }
        else 
        {
            let new_data = data.toString();

            console.log(`[Spectre -> Debug] ${socket.remoteAddress} - Data Recieved - ${data.toString().length} (Unencrypted)`);

            // Process the data here, the variable holding that data is "new_data"
        }
    });

    socket.on("error", (err) =>
    {
        console.log(`[Spectre -> Debug] ${socket.remoteAddress} - Unexpected Disconnect`);
    });

}).on('error', (err) =>
{
    console.error(`[Spectre -> Error] ${err}`);
});

server.listen(Port, () =>
{
    console.log(`[Spectre -> Debug] Successfully binded to port ${Port}.`);
    console.log('[Spectre -> Debug] Waiting for incoming connections..');
});
