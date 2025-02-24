package models

import play.api.libs.json.{Format, Json}

case class SQLResponse(translatedQuery: String)

object SQLResponse {
  implicit val format: Format[SQLResponse] = Json.format
}