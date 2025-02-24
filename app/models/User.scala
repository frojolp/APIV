package models

import play.api.libs.json._

import java.sql.Date
import java.util.UUID

case class User(userid: UUID, vorname: String, nachname: String, geburtstag: Date, telefonnummer: String, email: String)

case class newUser(vorname: String, nachname: String, geburtstag: Date, telefonnummer: String, email: String)

object User {
  implicit val userFormat: Format[User] = Json.format
  implicit val newuserFormat: Format[newUser] = Json.format
}