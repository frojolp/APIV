package models


import org.apache.pekko.http.scaladsl.model.HttpHeader.ParsingResult.Ok
import org.jooq.SQLDialect
import org.jooq.impl.DSL
import models._
import org.jooq.conf.{ParseUnknownFunctions, Settings}

import scala.concurrent.{ExecutionContext, Future}
import service.ServiceModules

class SQLRepository(implicit val executionContext: ExecutionContext) extends ServiceModules {

  def translateQuery(SQLStatement: SQLData): Future[SQLResponse] = {
    val srcDialect = getSqlDialect(SQLStatement.src_dialect)
    val tgtDialect = getSqlDialect(SQLStatement.target_dialect)
    val parsedQuery = DSL.using(srcDialect).parser().parseQuery(SQLStatement.data)
    val translatedQuery = DSL.using(tgtDialect).renderInlined(parsedQuery)

    Future.successful(SQLResponse(translatedQuery))

  }

  private def getSqlDialect(dbType: String): SQLDialect = dbType match {
    case "postgres" => SQLDialect.POSTGRES
    case "mysql" => SQLDialect.MYSQL
    case "h2" => SQLDialect.H2
    case "mariadb" => SQLDialect.MARIADB
    case "duck" => SQLDialect.DUCKDB
    case _ => throw new IllegalArgumentException(s"Unsupported DB type: $dbType")
  }


}
