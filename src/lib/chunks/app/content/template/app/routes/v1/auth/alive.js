
export default ({
  __servableType: 'route',
  method: "get",
  path: '/alive',
  cache: {
    type: "inMemory",
    params: {
      window: 1000
    }
  },
  handler: async () =>
    `<html>
        <head>
        </head>
        <div>
        <h1>😇  ${process.env.SERVABLE_APP_NAME} backend is up and running 😍, but...</h1>
        <small>What are you looking for?</small>
        <br/>
        <p>
        La nuit n’est jamais complète<br/>
        Il y a toujours puisque je le dis<br/>
        Puisque je l’affirme<br/>
        Au bout du chagrin une fenêtre ouverte<br/>
        Une fenêtre éclairée<br/>
        Il y a toujours un rêve qui veille<br/>
        Désir à combler faim à satisfaire<br/>
        Un cœur généreux<br/>
        Une main tendue une main ouverte<br/>
        Des yeux attentifs<br/>
        Une vie la vie à se partager.<br/>
        <br/>
        <br/>
        Paul Eluard.
                </p>
            </div>
            </html>`
})
