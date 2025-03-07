package controllers

import controllers.core.{APIComponents, APIController}
import models.User.newuserFormat
import models._
import play.api.libs.json.{JsError, Json}
import play.api.mvc._
import play.api.routing.Router
import play.api.routing.sird._
import service.{ServiceModule, UserService}

import java.util.UUID
import scala.concurrent.ExecutionContext

class UserController(
    userService: UserService,
    apiComponents: APIComponents
)(implicit val executionContext: ExecutionContext)
    extends APIController(apiComponents) {

  def getAll(): Action[AnyContent] = {
    Action.async(userService.getAll().map(items => Ok(Json.toJson(items))))
  }

  def create(): Action[newUser] = {
    Action.async(parse.json[newUser]) { request =>
      userService.create(request.body).map(_ => Created)
    }
  }
  def findByID(userID: UUID): Action[AnyContent] = {
    Action.async(
      userService.findByID(userID).map(items => Ok(Json.toJson(items)))
    )
  }

  override val router: Router = Router
    .from {
      case GET(p"")     => getAll()
      case GET(p"/$id") => findByID(UUID.fromString(id))
      case POST(p"")    => create()
    }
    .withPrefix("/user")
}
