import gleam/dynamic/decode
import pog

/// A row you get from running the `get_all_people` query
/// defined in `./src/app/data/people/sql/get_all_people.sql`.
///
/// > 🐿️ This type definition was generated automatically using v3.0.1 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type GetAllPeopleRow {
  GetAllPeopleRow(id: Int, name: String)
}

/// Runs the `get_all_people` query
/// defined in `./src/app/data/people/sql/get_all_people.sql`.
///
/// > 🐿️ This function was generated automatically using v3.0.1 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn get_all_people(db) {
  let decoder = {
    use id <- decode.field(0, decode.int)
    use name <- decode.field(1, decode.string)
    decode.success(GetAllPeopleRow(id:, name:))
  }

  "SELECT id, name
FROM people
"
  |> pog.query
  |> pog.returning(decoder)
  |> pog.execute(db)
}
