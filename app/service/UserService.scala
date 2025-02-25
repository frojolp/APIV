package service

import models.newUser
import repository.UserRepository
import play.api.mvc.{Action, AnyContent, BaseController}

import java.util.UUID

class UserService(userRepository: UserRepository) {

  def getAll(): Action[AnyContent] = {
    Action.async(userRepository.listAll().map(items => Ok(Json.toJson(items))))
  }

  def create(): Action[newUser] = {
    Action.async(parse.json[newUser]) { request =>
      userRepository.create(request.body).map(_ => Created)
    }
  }

  def findByID(userid: UUID): Action[AnyContent] = {
    Action.async(
      userRepository.findByID(userid).map(items => Ok(Json.toJson(items)))
    )
  }

}
