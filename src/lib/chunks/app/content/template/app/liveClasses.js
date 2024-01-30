

export default async () => {
  return CliNext.env.SERVABLE_LIVESERVER_CLASSES ? JSON.parse(CliNext.env.SERVABLE_LIVESERVER_CLASSES) : []
}
