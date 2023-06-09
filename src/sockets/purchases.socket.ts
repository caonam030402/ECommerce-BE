import { io } from '..'

let notificationCount = 0

io.on('connection', (socket) => {
  console.log('Client connected')

  socket.emit('count', notificationCount)

  socket.on('increment', () => {
    notificationCount++
    io.emit('count', notificationCount)
  })

  socket.on('reset', () => {
    notificationCount = 0
    io.emit('count', notificationCount)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})
