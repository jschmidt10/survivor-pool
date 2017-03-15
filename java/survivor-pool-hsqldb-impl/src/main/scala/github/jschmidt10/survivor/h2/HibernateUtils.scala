package github.jschmidt10.survivor.h2

import org.hibernate.{Session, SessionFactory}
import org.hibernate.boot.MetadataSources
import org.hibernate.boot.registry.StandardServiceRegistryBuilder

import scala.util.{Failure, Success, Try}

/**
  * Hibernate Utilities.
  */
object HibernateUtils {

  /**
    * Executes a block of code inside a Hibernate transaction.
    *
    * @param sessionFactory
    * @param operation
    * @tparam T
    * @return a Success(result) or a Failure(error)
    */
  def execute[T](operation: Session => T)(implicit sessionFactory: SessionFactory): Try[T] = {
    val session = sessionFactory.openSession()
    val tx = session.getTransaction
    tx.begin()

    try {
      val ret = operation(session)
      tx.commit()
      Success(ret)
    }
    catch {
      case e: Exception => {
        tx.rollback()
        Failure(e)
      }
    }
    finally {
      session.close()
    }
  }

  /**
    * Creates a sessionFactory using the default configuration location.
    *
    * @return sessionFactory
    */
  def defaultSessionFactory(): SessionFactory = {
    val registry = new StandardServiceRegistryBuilder().configure().build()
    new MetadataSources(registry).buildMetadata().buildSessionFactory()
  }
}
