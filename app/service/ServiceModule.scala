package service

import com.softwaremill.macwire._
import play.api.BuiltInComponents
import play.api.db.slick.SlickComponents
import repository.RepositoryModule

import scala.concurrent.ExecutionContext

trait ServiceModule
    extends BuiltInComponents
    with SlickComponents
    with RepositoryModule {
  lazy val userService: UserService = wire[UserService]
  lazy val bankAccountService: BankAccountService = wire[BankAccountService]
  lazy val transactionService: TransactionService = wire[TransactionService]
}
