export default ({
  __servableType: 'main',
  beforeInit: async () => {
    Servable.Console.log('beforeInit')
  },
  afterInit: async ({ } = {}) => {
    Servable.Console.log('afterInit')
  },
  beforeEnd: async () => {
    Servable.Console.log('beforeEnd')
  },
  liveClasses: async () => []
})
