package controllers

import play.api.mvc.AbstractController
import play.api.mvc._
import models.{SQLData, SQLRepository, SQLResponse}
import play.api.libs.json._
import play.api.routing.Router
import service.ServiceModules

class SQLController(SQLRepository: SQLRepository, apiComponents: APIComponents) extends APIController(apiComponents)
  with ServiceModules {

  def translateQuery(): Action[SQLData] = {
    Action.async(parse.json[SQLData]) { request =>
      SQLRepository.translateQuery(request.body).map { translatedQuery => Ok(Json.toJson[SQLResponse](translatedQuery)) }
    }
  }

  override val router: Router = ???
}
