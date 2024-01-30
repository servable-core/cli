import data from './data.json' assert { type: "json" }
import internal from './internal.json' assert { type: "json" }

export default async () => {
  //TODO: include count
  const config = await Servable.App.Config.get()
  if (config && config.get('_bootstrapped')) {
    //console.log('Seeding 🍄 > Config is already present.')
    return
  }
  //console.log('Seeding 🍄 > Config is not present.')
  return doFill()
}

const doFill = async () => {
  try {
    const secrets = internal.reduce((a, v) => ({ ...a, [v]: true }), {})
    await Servable.App.Config.save(data, secrets)
    //console.log('Seeding 🍄 > Config has been bootstraped.')
  } catch (e) {
    console.error('Seeding 🍄 > Config has not been bootstraped.', e)
  }
}
