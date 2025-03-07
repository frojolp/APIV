package repository

import models.Transaction
import slick.basic.DatabaseConfig
import slick.jdbc.JdbcProfile
import slick.lifted.ProvenShape

import java.sql.Date
import java.time.LocalDate
import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}

class TransactionRepository(dbConfig: DatabaseConfig[JdbcProfile])(implicit
    val executionContext: ExecutionContext
) {

  import dbConfig._
  import profile.api._

  private class TransactionTable(tag: Tag)
      extends Table[Transaction](tag, "transaktionen") {
    def accountID = column[UUID]("accountid")
    def transaction = column[String]("transaktionsart")
    def amount = column[Int]("amount")
    def date = column[Date]("datum")
    def transactionID = column[UUID]("transaktionid", O.PrimaryKey)

    override def * : ProvenShape[Transaction] = (
      transactionID,
      accountID,
      transaction,
      date,
      amount
    ) <> ((Transaction.apply _).tupled, Transaction.unapply)
  }

  private val transactions = TableQuery[TransactionTable]

  def listAll(): Future[Seq[Transaction]] = { db.run(transactions.result) }

  def findbyID(transactionID: UUID): Future[Option[Transaction]] = {
    db.run(
      transactions.filter(_.transactionID === transactionID).result.headOption
    )
  }

  def create(accountID: UUID, transaction: String, amount: Int) = {
    val newTransaction: Transaction = Transaction(
      java.util.UUID.randomUUID(),
      accountID,
      transaction,
      Date.valueOf(LocalDate.now()),
      amount
    )
    db.run(transactions += newTransaction).map(_ => newTransaction)
  }

  def findByBankID(bankID: UUID): Future[Seq[Transaction]] = {
    db.run(transactions.filter(_.accountID === bankID).result)
  }

}
