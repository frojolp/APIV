package controllers

import play.api.mvc._
import play.api.routing.Router
import play.api.routing.sird._
import controllers.core._

class HomeController(apiComponents: APIComponents)
    extends APIController(apiComponents) {
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  override val router: Router = Router.from { case GET(p"") =>
    index()
  }
}
