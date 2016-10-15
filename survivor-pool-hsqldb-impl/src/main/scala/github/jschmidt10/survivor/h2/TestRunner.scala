package github.jschmidt10.survivor.h2

import github.jschmidt10.survivor.api.{Contestant, Player, Pool, Season}
import org.h2.tools.Server

import scala.collection.JavaConverters._

object TestRunner {
  def main(args: Array[String]): Unit = {
    val server = Server.createTcpServer("-tcpPort", "9123")
    server.start()

    val sessionFactory = HibernateUtils.defaultSessionFactory()

    val repo = new H2PoolRepository(sessionFactory)
    val pool = Pool("test", "http://test.com/", Set(Player("jeff", Set(Contestant("Rob", "rob.jpg", "active")).asJava)).asJava)
    repo.save(pool)
    println("Saved pool")

    repo.getAll().asScala.foreach(pool => {
      println(pool.name)
      println(pool.url)
    })

    //    val repo = new H2SeasonRepository(sessionFactory)
    //
    //    repo.save(Season("Season 23", true, Set(Contestant("Bobby", "bobby.jpg", "active")).asJava))
    //
    //    println(repo.getCurrent())

    repo.close()
    sessionFactory.close()
    server.stop()
  }
}
