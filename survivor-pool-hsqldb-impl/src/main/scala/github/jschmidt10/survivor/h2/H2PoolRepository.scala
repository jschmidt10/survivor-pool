package github.jschmidt10.survivor.h2

import java.lang.Iterable
import java.util.{Collection => JCollection}

import github.jschmidt10.survivor.api.repo.PoolRepository
import github.jschmidt10.survivor.api.{Player, Pool}
import github.jschmidt10.survivor.h2.HibernateUtils._
import org.hibernate.SessionFactory

import scala.collection.JavaConverters._

/**
  * An H2 backed pool repository.
  */
class H2PoolRepository(sessionFactory: SessionFactory) extends PoolRepository {

  private val EmptyPlayers = Set[Player]().asJava
  private val EmptyPools = Set[Pool]()

  private implicit val sf = sessionFactory

  override def save(pool: Pool): Boolean =
    execute((session) => session.save(pool)).isSuccess

  override def getByName(name: String): Pool = {
    execute(session => {
      session.createQuery(
        """
           select p from Pool p
           left join fetch p.players
           where p.name = :name
        """, classOf[Pool]).setParameter("name", name).getSingleResult
    }).getOrElse(null)
  }

  override def getAll(): Iterable[Pool] = {
    val pools = execute(session => {
      session.createQuery(
        "select p from Pool p", classOf[Pool])
        .getResultList
        .asScala
        .toSet
    }).getOrElse(EmptyPools)

    pools.map(p => Pool(p.name, p.url, EmptyPlayers)).asJava
  }

  // sessionFactory is shared and will be closed elsewhere
  override def close(): Unit = ()
}