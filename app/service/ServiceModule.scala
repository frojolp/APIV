package service

import com.softwaremill.macwire._
import repository.RepositoryModule

import scala.concurrent.ExecutionContext

trait ServiceModule extends RepositoryModule {
  implicit val exC: ExecutionContext = ExecutionContext.Implicits.global
  lazy val userService: UserService = wire[UserService]
}
