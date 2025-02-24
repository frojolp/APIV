package controllers

import com.softwaremill.macwire.wire
import play.api.BuiltInComponents
import play.api.routing.Router
import service.ServiceModules

trait ControllersModule {

  this: BuiltInComponents with ServiceModules =>
  
  lazy val apiComponents: APIComponents = wire[APIComponents.Default]

  private lazy val controllers = Seq(
    wire[SQLController]
  )

  lazy val router: Router = controllers.foldLeft(Router.empty) { (router, controller) =>
    router.orElse(controller.router)
  }

}
