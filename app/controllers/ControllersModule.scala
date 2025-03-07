package controllers

import com.softwaremill.macwire.wire
import controllers.core.APIComponents
import play.api.BuiltInComponents
import play.api.mvc.ControllerComponents
import play.api.routing.Router
import repository.RepositoryModule
import service.ServiceModule

import scala.concurrent.ExecutionContext

trait ControllersModule {

  this: BuiltInComponents with ServiceModule with RepositoryModule =>

  protected def controllerComponents: ControllerComponents

  lazy val apiComponents: APIComponents = wire[APIComponents.Default]

  private lazy val controllers = Seq(
    wire[HomeController],
    wire[UserController],
    wire[BankAccountController],
    wire[TransactionController]
  )

  lazy val router: Router = controllers.foldLeft(Router.empty) {
    (router, controller) =>
      router.orElse(controller.router)
  }

}
