package models

import play.api.libs.json.{Format, Json}

import java.sql.Date
import java.util.UUID

case class Transaction(
    transactionID: UUID,
    accountID: UUID,
    transaction: String,
    datum: Date,
    amount: Int
)

object Transaction {
  implicit val TransactionFormat: Format[Transaction] = Json.format
}
