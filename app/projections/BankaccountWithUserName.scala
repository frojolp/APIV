package projections

import play.api.libs.json.{OWrites, Json}

import java.util.UUID

final case class BankaccountWithUserName(
    accountid: UUID,
    userid: UUID,
    amount: Int,
    vorname: String,
    nachname: String
)

object BankaccountWithUserName {
  implicit val writes: OWrites[BankaccountWithUserName] = Json.writes
}
