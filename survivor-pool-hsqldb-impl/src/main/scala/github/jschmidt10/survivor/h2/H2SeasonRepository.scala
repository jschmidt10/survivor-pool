package github.jschmidt10.survivor.h2

import github.jschmidt10.survivor.api.Season
import github.jschmidt10.survivor.api.repo.SeasonRepository
import github.jschmidt10.survivor.h2.HibernateUtils._
import org.hibernate.SessionFactory

/**
  * An H2 backed pool repository.
  */
class H2SeasonRepository(sessionFactory: SessionFactory) extends SeasonRepository {

  private implicit val sf = sessionFactory

  override def save(season: Season): Boolean =
    execute((session) => session.save(season)).isSuccess

  override def getCurrent(): Season = {
    execute(session => {
      session.createQuery(
        """
           select s from Season s
           left join fetch s.contestants
           where s.current = :current
        """, classOf[Season]).setParameter("current", true).getSingleResult
    }).getOrElse(null)
  }

  // sessionFactory is shared and will be closed elsewhere
  override def close(): Unit = ()
}
