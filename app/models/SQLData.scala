package models

import org.jooq.SQLDialect
import play.api.libs.json._

case class SQLData(src_dialect: String, target_dialect: String, data: String)


object SQLData {
  implicit val format: Format[SQLData] = Json.format
}