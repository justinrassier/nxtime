import app/router
import app/web
import gleam/erlang/process
import gleam/result
import mist
import pog
import wisp
import wisp/wisp_mist

pub fn main() {
  wisp.configure_logger()
  let secret_key_base = wisp.random_string(64)

  let assert Ok(db) =
    pog.url_config("postgresql://postgres:postgres@192.168.4.40:5432/nxtime")
    |> result.map(fn(r) { pog.connect(r) })

  let context = web.Context(db, static_directory())
  let handler = router.handle_request(_, context)

  let assert Ok(_) =
    handler
    |> wisp_mist.handler(secret_key_base)
    |> mist.new
    |> mist.bind("0.0.0.0")
    |> mist.port(8000)
    |> mist.start_http

  process.sleep_forever()
}

pub fn static_directory() -> String {
  // The priv directory is where we store non-Gleam and non-Erlang files,
  // including static assets to be served.
  // This function returns an absolute path and works both in development and in
  // production after compilation.
  let assert Ok(priv_directory) = wisp.priv_directory("nxtime_server")
  priv_directory <> "/static"
}
