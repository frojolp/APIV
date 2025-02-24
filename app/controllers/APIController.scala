package controllers

import play.api.mvc.AbstractController
import play.api.routing.Router

abstract class APIController(protected val apiComponents: APIComponents) extends AbstractController(apiComponents.controllerComponents) {

  val router: Router

}
