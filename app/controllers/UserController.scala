package controllers

import controllers.core.{APIComponents, APIController}
import models.User.newuserFormat
import models._
import play.api.libs.json.{JsError, Json}
import play.api.mvc._
import play.api.routing.Router
import repository.UserRepository
import play.api.routing.sird._
import service.{ServiceModule, UserService}

import java.util.UUID

class UserController(
    userService: UserService,
    apiComponents: APIComponents
) extends APIController(apiComponents) {

  def getAll() = userService.getAll()

  def create() = userService.create()

  def findByID(userID: UUID) = userService.findByID(userID)

  override val router: Router = Router
    .from {
      case GET(p"")     => getAll()
      case GET(p"/$id") => findByID(UUID.fromString(id))
      case POST(p"")    => create()
    }
    .withPrefix("/user")
}
