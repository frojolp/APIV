package controllers

import controllers.core.{APIComponents, APIController}
import models._
import models.BankAccount.{bankAccountFormat, newBankAccountFormat}
import play.api.libs.json.Json
import play.api.mvc._
import play.api.routing.Router
import play.api.routing.sird._
import service.{BankAccountService, TransactionService, UserService}

import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}

class BankAccountController(
    bankAccountService: BankAccountService,
    transactionService: TransactionService,
    apiComponents: APIComponents
)(implicit val executionContext: ExecutionContext)
    extends APIController(apiComponents) {

  def getAll(): Action[AnyContent] = {
    Action.async(
      bankAccountService.getAll().map(items => Ok(Json.toJson(items)))
    )
  }

  def create(): Action[NewBankAccount] = {
    Action.async(parse.json[NewBankAccount]) { request =>
      bankAccountService.create(request.body).map(_ => Created)
    }
  }

  def findByID(bankID: UUID): Action[AnyContent] = {
    Action.async(
      bankAccountService
        .findByID(bankID)
        .map(items => Ok(Json.toJson(items)))
    )
  }

  def findByUserID(userID: UUID): Action[AnyContent] = {
    Action.async(
      bankAccountService
        .findByUserID(userID)
        .map(items => Ok(Json.toJson(items)))
    )
  }

  def depositMoney(bankID: UUID, amount: Int): Action[AnyContent] = {
    Action.async(request =>
      bankAccountService
        .depositMoney(bankID, amount)
        .flatMap(_ =>
          transactionService.create(bankID, "deposit", amount).map(_ => Ok)
        )
    )
  }

  def withdrawMoney(bankID: UUID, amount: Int): Action[AnyContent] = {
    Action.async(request =>
      bankAccountService
        .withdrawMoney(bankID, amount)
        .flatMap {
          case Left(message) => Future.successful(BadRequest(message))
          case Right(_) =>
            transactionService
              .create(bankID, "withdraw", amount)
              .map(_ => Created)
        }
    )
  }

  override val router: Router = Router
    .from {
      case GET(p"")              => getAll()
      case GET(p"/fromuser/$id") => findByUserID(UUID.fromString(id))
      case GET(p"/$id")          => findByID(UUID.fromString(id))
      case POST(p"")             => create()
      case PUT(p"/deposit/$id:$amount") =>
        depositMoney(UUID.fromString(id), amount.toInt)
      case PUT(p"/withdraw/$id:$amount") =>
        withdrawMoney(UUID.fromString(id), amount.toInt)
    }
    .withPrefix("/bankAccount")
}
