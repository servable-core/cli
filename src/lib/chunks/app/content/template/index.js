import servableConfig from './servable.config.js'
import { launch } from "@servable/server"
import engine from "@servable/parse-server-engine"

await launch({ servableConfig, engine })
