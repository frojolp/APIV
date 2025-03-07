package controllers

import controllers.core.{APIComponents, APIController}
import play.api.libs.json.Json
import play.api.mvc.{Action, AnyContent}
import play.api.routing.Router
import service.TransactionService
import play.api.routing.sird._

import java.util.UUID
import scala.concurrent.ExecutionContext

class TransactionController(
    transactionService: TransactionService,
    apiComponents: APIComponents
)(implicit val executionContext: ExecutionContext)
    extends APIController(apiComponents) {

  def getAll(): Action[AnyContent] = {
    Action.async(
      transactionService.getAll().map(items => Ok(Json.toJson(items)))
    )
  }

  def findByID(transactionID: UUID) = Action.async(
    transactionService
      .findByID(transactionID)
      .map(items => Ok(Json.toJson(items)))
  )

  def findByBankID(bankID: UUID) = Action.async(
    transactionService.findByBankID(bankID).map(items => Ok(Json.toJson(items)))
  )

  override val router: Router = Router
    .from {
      case GET(p"")              => getAll()
      case GET(p"/$id")          => findByID(UUID.fromString(id))
      case GET(p"/fromBank/$id") => findByBankID(UUID.fromString(id))
    }
    .withPrefix("/transaction")
}
