import net from 'net'

const defaultConfig = {
  host: '127.0.0.1',
  port: '443',
}

export const proxy = (config = {}) => {
  config = {
    ...defaultConfig,
    ...config,
  }

  const server = net.createServer()

  server.on('connection', clientSocket => {
    console.log('Client Connected To Proxy')

    clientSocket.once('data', (data) => {
      const isTLSConnection = data.toString().includes('CONNECT')

      if (!isTLSConnection) {
        // non tls connections should never end up here.
        return
      }

      const host = data.toString().split('CONNECT ')[1].split(' ')[0].split(':')[0]
      const port = data.toString().split('CONNECT ')[1].split(' ')[0].split(':')[1]

      console.log(host, port)

      const serverSocket = net.createConnection({
        host,
        port,
      }, () => {
        console.log('PROXY TO SERVER SET UP')
        clientSocket.write('HTTP/1.1 200 OK\r\n\n')

        clientSocket.pipe(serverSocket)
        serverSocket.pipe(clientSocket)

        serverSocket.on('error', (err) => {
          console.log('PROXY TO SERVER ERROR')
          console.log(err)
        })
      })

      clientSocket.on('error', err => {
        console.log('CLIENT TO PROXY ERROR')
        console.log(err)
      })
    })
  })

  server.on('error', (err) => {
    console.log('SERVER ERROR')
    console.log(err)
    throw err
  })

  server.on('close', () => {
    console.log('Client Disconnected')
  })

  server.listen(config.port, () => {
    console.log(`Server running at ${config.host}:${config.port}`)
  })

  return server
}

export default proxy
