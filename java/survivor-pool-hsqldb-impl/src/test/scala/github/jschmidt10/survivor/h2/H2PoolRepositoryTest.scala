package github.jschmidt10.survivor.h2

import github.jschmidt10.survivor.api.repo.PoolRepository
import github.jschmidt10.survivor.api.{Contestant, Player, Pool}
import org.h2.tools.Server
import org.hibernate.SessionFactory
import org.junit.{After, Assert, Before, Test}

import scala.collection.JavaConverters._

class H2PoolRepositoryTest {

  private var server: Server = null
  private var sessionFactory: SessionFactory = null
  private var repo: PoolRepository = null

  private val contestants = Set(Contestant("Paul", "paul.jpg", "active"))
  private val players = Set(Player("player1", contestants.asJava))
  private val pool = Pool("testPool", "http://testpool.com", players.asJava)

  @Before
  def setup(): Unit = {
    server = Server.createTcpServer("-tcpPort", "9123")
    server.start()

    sessionFactory = HibernateUtils.defaultSessionFactory()
    repo = new H2PoolRepository(sessionFactory)
  }

  @Test
  def shouldInsertAndRetrieveData(): Unit = {
    repo.save(pool)
    val selected = repo.getByName("testPool")
    Assert.assertEquals(pool, selected)
  }

  @After
  def tearDown(): Unit = {
    repo.close()
    sessionFactory.close()
    server.stop()
  }
}