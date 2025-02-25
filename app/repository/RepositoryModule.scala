package repository

import com.softwaremill.macwire.wire
import play.api.{BuiltInComponents, Environment}
import play.api.db.evolutions.EvolutionsComponents
import play.api.db.slick.{DbName, SlickApi, SlickComponents}
import play.db.evolutions.Evolutions
import service.ServiceModule
import slick.jdbc.JdbcProfile

import scala.concurrent.ExecutionContext

trait RepositoryModule {
  this: BuiltInComponents with SlickComponents =>
  lazy val dbconfig = slickApi.dbConfig[JdbcProfile](DbName("default"))
  lazy val userRepository: UserRepository = wire[UserRepository]
}
