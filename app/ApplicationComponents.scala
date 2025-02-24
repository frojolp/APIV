import controllers.ControllersModule
import play.api.ApplicationLoader.Context
import play.api.{BuiltInComponents, BuiltInComponentsFromContext, NoHttpFiltersComponents}
import play.api.libs.ws.ahc.AhcWSComponents
import play.api.mvc.ControllerComponents
import play.api.routing.Router
import service.ServiceModules

class ApplicationComponents(context: Context) extends BuiltInComponentsFromContext(context) with ServiceModules with NoHttpFiltersComponents with ControllersModule {

  override lazy val controllerComponents: ControllerComponents = this.controllerComponents

}