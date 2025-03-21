import app/data/people/sql
import gleam/json
import gleam/list
import gleam/result
import pog

fn person_to_json(person: sql.GetAllPeopleRow) {
  json.object([
    #("id", json.int(person.id)),
    #("name", json.string(person.name)),
  ])
}

pub fn get_all_people(db: pog.Connection) {
  use people <- result.try(sql.get_all_people(db))
  let people_json =
    people.rows
    |> list.map(person_to_json)
    |> json.array(fn(x) { x })
    |> json.to_string_tree

  Ok(people_json)
}
