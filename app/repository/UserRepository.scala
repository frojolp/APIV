package repository

import models.{User, newUser}
import slick.basic.DatabaseConfig
import slick.jdbc.JdbcProfile
import slick.lifted.ProvenShape

import java.sql.Date
import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}

class UserRepository(dbConfig: DatabaseConfig[JdbcProfile])(implicit
    val executionContext: ExecutionContext
) {

  import dbConfig._
  import profile.api._

  private class UserTable(tag: Tag) extends Table[User](tag, "users") {
    def userid = column[UUID]("userid", O.PrimaryKey)
    def vorname = column[String]("vorname")
    def nachname = column[String]("nachname")
    def geburtstag = column[Date]("geburtstag")
    def telefonnummer = column[String]("telefonnummer")
    def email = column[String]("email")

    override def * : ProvenShape[User] = (
      userid,
      vorname,
      nachname,
      geburtstag,
      telefonnummer,
      email
    ) <> ((User.apply _).tupled, User.unapply)
  }

  private val users = TableQuery[UserTable]

  def listAll(): Future[Seq[User]] = db.run {
    users.result
  }

  def create(user: newUser): Future[User] = {
    val newUser = User(
      java.util.UUID.randomUUID(),
      user.vorname,
      user.nachname,
      user.geburtstag,
      user.telefonnummer,
      user.email
    )
    db.run(users += newUser).map(_ => newUser)
  }

  def findByID(userid: UUID): Future[Option[User]] = db.run {
    users.filter(_.userid === userid).result.headOption
  }
}
