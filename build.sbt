name := """APIV"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.16"

libraryDependencies += ws
//libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "7.0.0" % Test

libraryDependencies ++= Seq(
  "org.playframework" %% "play-slick" % "6.1.1",
  "org.postgresql" % "postgresql" % "42.3.1",
  "org.jooq" % "jooq" % "3.20.0",
  "com.softwaremill.macwire" %% "macros" % "2.3.3" % Provided,
  "com.softwaremill.macwire" %% "macrosakka" % "2.3.3" % "provided",
  "com.softwaremill.macwire" %% "util" % "2.3.3",
)



// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.example.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.example.binders._"
