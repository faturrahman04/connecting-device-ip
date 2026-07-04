import os from 'node:os'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { exec } from 'node:child_process'
import { stderr, stdout } from 'node:process'
import bodyParser from 'body-parser'

const app = express()

const PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8080

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        "message" : "oke"
    })
});

// PING IP
app.post('/ping', (req, res) => {
    const { ipAddress } = req.body;

    exec(`ping -c 1 ${ipAddress}`, (err, stdout, stderr) => {
        if (err) {
            return res.status(400).json({
                online: false,
                success: false,
                results: {
                    message: err.message,
                    stdout: stdout,
                    stderr: stderr
                }
            })
        }

        if (stderr) {
            return res.status(400).json({
                online: true,
                success: true,
                results: {
                    message: `Failed request to ${ipAddress}, it may be happen because its device is offline`,
                    stdout: stdout,
                    stderr: stderr
                }
            })
        }

        return res.status(200).json({
            online: true,
            success: true,
            results: {
                message: `Successfully request to IP ${ipAddress}`,
                stdout: stdout,
                stderr: stderr
            }
        })

    })
})

// // Find IP
// app.post('/find-ip', (req, res) => {
//     const { ipAddress } = req.body;

//     if (!ipAddress) {
//         return res.status(500).json({
//             success: false,
//             results: {
//                 message: "Ip Address is mandatory field",
//                 ipAddress: null
//             }
//         })
//     }

//     exec('arp -a', (stdout, err) => {
//         if (err) {
//             return res.status(404).json({
//                 success: false,
//                 results: {
//                     message: "Something wrong", err,
//                     ipAddress: null
//                 }
//             })
//         }
//     })
// })

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))

app.listen()