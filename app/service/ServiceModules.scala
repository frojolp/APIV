package service

import com.softwaremill.macwire._
import controllers.SQLController
import models.SQLRepository
import play.api.BuiltInComponents
import play.api.mvc.ControllerComponents

import scala.concurrent.ExecutionContext
//import ExecutionContext.Implicits.global

trait ServiceModules {
  implicit val ec: ExecutionContext = ExecutionContext.Implicits.global

  lazy val sqlRepository: SQLRepository = wire[SQLRepository]
  lazy val sqlController: SQLController = wire[SQLController]
}
