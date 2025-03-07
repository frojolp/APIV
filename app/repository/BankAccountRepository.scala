package repository

import models.{BankAccount, NewBankAccount}
import slick.basic.DatabaseConfig
import slick.jdbc.JdbcProfile
import slick.lifted.ProvenShape

import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}

class BankAccountRepository(dbConfig: DatabaseConfig[JdbcProfile])(implicit
    val executionContext: ExecutionContext
) {

  import dbConfig._
  import profile.api._

  private class BankAccountTable(tag: Tag)
      extends Table[BankAccount](tag, "bankaccount") {
    def accountid = column[UUID]("accountid", O.PrimaryKey)
    def userid = column[UUID]("userid")
    def amount = column[Int]("amount")

    override def * : ProvenShape[BankAccount] = (
      accountid,
      userid,
      amount
    ) <> ((BankAccount.apply _).tupled, BankAccount.unapply)
  }

  private val bankAccounts = TableQuery[BankAccountTable]

  def listAll(): Future[Seq[BankAccount]] = db.run {
    bankAccounts.result
  }

  def create(bankAccount: NewBankAccount): Future[BankAccount] = {
    val newBankAccount = BankAccount(
      java.util.UUID.randomUUID(),
      bankAccount.userid,
      0
    )
    db.run(bankAccounts += newBankAccount).map(_ => newBankAccount)
  }

  def findByID(bankAccountID: UUID): Future[Option[BankAccount]] = db.run {
    bankAccounts.filter(_.accountid === bankAccountID).result.headOption
  }

  def findByUserID(userID: UUID): Future[Seq[BankAccount]] = db.run {
    bankAccounts.filter(_.userid === userID).result
  }

  def depositMoney(bankAccountID: UUID, amount: Int): Future[Int] = {
    val action = for {
      currentAmountOpt <- bankAccounts
        .filter(_.accountid === bankAccountID)
        .map(_.amount)
        .result
        .headOption
      updated <- currentAmountOpt match {
        case Some(currentAmount) =>
          bankAccounts
            .filter(_.accountid === bankAccountID)
            .map(_.amount)
            .update(currentAmount + amount)
        case None =>
          DBIO.successful(0)
      }
    } yield updated
    db.run(action)
  }

  def withdrawMoney(bankAccountID: UUID, amount: Int) = {
    val action = for {
      currentAmountOpt <- bankAccounts
        .filter(_.accountid === bankAccountID)
        .map(_.amount)
        .result
        .headOption
      updated <- currentAmountOpt match {
        case Some(currentAmount) =>
          if (currentAmount < amount)
            DBIO.successful(0)
          else
            bankAccounts
              .filter(_.accountid === bankAccountID)
              .map(_.amount)
              .update(currentAmount - amount)
        case None =>
          DBIO.successful(-1)
      }
    } yield updated
    db.run(action).map {
      case 0  => Left("Not enough money on Bank Account")
      case -1 => Left("Bank account not found")
      case 1  => Right("Money has been withdrawn")
    }
  }

}
