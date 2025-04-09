//package repository.tables
//
//import models.User
//import slick.lifted.ProvenShape
//
//import java.sql.Date
//import java.util.UUID
//
//private[repository] trait UserTable with RepositoryModu {
//
//  import dbConfig._
//  import profile.api._
//
//  private class UserTable(tag: Tag) extends Table[User](tag, "users") {
//    def userid = column[UUID]("userid", O.PrimaryKey)
//    def vorname = column[String]("vorname")
//    def nachname = column[String]("nachname")
//    def geburtstag = column[Date]("geburtstag")
//    def telefonnummer = column[String]("telefonnummer")
//    def email = column[String]("email")
//
//    override def * : ProvenShape[User] = (
//      userid,
//      vorname,
//      nachname,
//      geburtstag,
//      telefonnummer,
//      email
//    ) <> ((User.apply _).tupled, User.unapply)
//  }
//
//  protected val users: TableQuery[UserTable] = TableQuery[UserTable]
//
//}
