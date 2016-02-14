package github.jschmidt10.survivor.manager

import github.jschmidt10.survivor.dynamo.DynamoSeasonRepository
import github.jschmidt10.survivor.api.Season
import scala.collection.JavaConverters._
import github.jschmidt10.survivor.api.Contestant


/**
 * Populates DynamoDB with the current season.
 */
object CreateSeason {
  
  private val TableName = "survivorpool_seasons"
  private val repo = new DynamoSeasonRepository(TableName)
  
  def main(args: Array[String]) {
    val season = new Season(
       "Kaoh Rong",
       true,
       Set(
          new Contestant("Anna Khait", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_annakhait.jpg"),
          new Contestant("Jennifer Lanzetti", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_jenniferlanzetti.jpg"),
          new Contestant("Elisabeth Markham", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_elisabethmarkham.jpg"),
          new Contestant("Debbie Wanner", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_debbiewanner.jpg"),
          new Contestant("Alecia Holden", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_aleciaholden.jpg"),
          new Contestant("Cydney Gillon", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_cydneygillon.jpg"),
          new Contestant("Neil Gottlieb", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_nealgottlieb.jpg"),
          new Contestant("Joseph Del Campo", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_josephdelcampo.jpg"),
          new Contestant("Michele Fitzgerald", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_michelefitzgerald.jpg"),
          new Contestant("Darnell Hamilton", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_darnellhamilton.jpg"),
          new Contestant("Kyle Jason", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_kylejason.jpg"),
          new Contestant("Nick Maiorano", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_nickmaiorano.jpg"),
          new Contestant("Scot Pollard", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_scotpollard.jpg"),
          new Contestant("Caleb Reynolds", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_calebreynolds.jpg"),
          new Contestant("Julie Sokolowski", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_juliasokolowski.jpg"),
          new Contestant("Tai Trang", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_taitrang.jpg"),
          new Contestant("Aubry Bracco", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_aubrybraco.jpg"),
          new Contestant("Peter Baggenstos", "http://wwwimage.cbsstatic.com/thumbnails/photos/w170-h215/cast/svr32_cast_800x1000_peterbaggenstos.jpg")
       ).asJava
    )
    
    repo.save(season)
    repo.close()
    
    println("Saved!")
  }
}