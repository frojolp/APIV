import controllers.ControllersModule
import play.api.ApplicationLoader.Context
import play.api.db.slick.{DbName, SlickComponents}
import play.api.{BuiltInComponentsFromContext, NoHttpFiltersComponents}
import repository.RepositoryModule
import service.ServiceModule
import slick.jdbc.JdbcProfile

class ApplicationComponents(context: Context)
    extends BuiltInComponentsFromContext(context)
    with ServiceModule
    with RepositoryModule
    with SlickComponents
    with NoHttpFiltersComponents
    with ControllersModule
