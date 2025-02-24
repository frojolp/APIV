package controllers

import play.api.mvc.ControllerComponents

trait APIComponents {

  def controllerComponents: ControllerComponents

}

object APIComponents {

  class Default(val controllerComponents: ControllerComponents) extends APIComponents

}
