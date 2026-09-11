import servableConfig from './servable.config.js'
import { launch } from "@servable/server"
import engine from "<%= engineId %>"

await launch({ servableConfig, engine })
