import webpack from "webpack"
import config from "../webpack.config"
import testConfig from "../webpack.test.config"

webpack(testConfig, function(err, stats) {
  if(err) {
    throw err
  }
  console.log("[tests] build!")
})

webpack(config, function(err, stats) {
  if(err) {
    throw err
  }
  console.log("[lib] built!")
  console.log(stats.toString())
})
