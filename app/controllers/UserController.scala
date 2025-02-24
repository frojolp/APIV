package controllers

import models.User.newuserFormat
import models._
import play.api.libs.json.{JsError, Json}
import play.api.mvc._

import java.util.UUID
import java.util.prefs.Preferences
import javax.inject._
import scala.concurrent.ExecutionContext


class UserController @Inject()(cc: ControllerComponents, userRepository: UserRepository)(implicit val executionContext: ExecutionContext) extends AbstractController(cc) {

  def getAll(): Action[AnyContent] = {
    Action.async(userRepository.listAll().map(items => Ok(Json.toJson(items))))
  }

  def create(): Action[newUser] = {
    Action.async(parse.json[newUser]) {
      request =>
        userRepository.create(request.body).map(_ => Created)
    }
  }

  def findByID(userid: UUID): Action[AnyContent] = {
    Action.async(userRepository.findByID(userid).map(items => Ok(Json.toJson(items))))
  }
}
