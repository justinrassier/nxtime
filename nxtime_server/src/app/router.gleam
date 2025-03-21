import app/data/people/people
import app/web
import gleam/http.{Post}
import gleam/json
import gleam/list
import gleam/result
import wisp.{type Request, type Response}

pub fn handle_request(req: Request, context: web.Context) -> Response {
  use req <- web.middleware(req, context)

  case wisp.path_segments(req) {
    ["api", "people"] -> handle_people(req, context)
    _ -> wisp.not_found()
  }
}

pub fn handle_people(_req: Request, context: web.Context) -> Response {
  let people = people.get_all_people(context.db)

  case people {
    Ok(p) -> wisp.json_response(p, 200)
    _ -> wisp.internal_server_error()
  }
}
