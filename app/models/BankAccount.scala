package models

import play.api.libs.json.{Format, Json}

import java.util.UUID

case class BankAccount(accountid: UUID, userid: UUID, amount: Int)
case class NewBankAccount(userid: UUID)

object BankAccount {
  implicit val bankAccountFormat: Format[BankAccount] = Json.format
  implicit val newBankAccountFormat: Format[NewBankAccount] = Json.format
}
