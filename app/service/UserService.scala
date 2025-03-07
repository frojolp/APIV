package service

import models.newUser
import repository.UserRepository
import play.api.mvc.{Action, AnyContent, BaseController}

import java.util.UUID

class UserService(userRepository: UserRepository) {

  def getAll() = userRepository.listAll()

  def create(user: newUser) = userRepository.create(user)

  def findByID(userid: UUID) = userRepository.findByID(userid)

}
