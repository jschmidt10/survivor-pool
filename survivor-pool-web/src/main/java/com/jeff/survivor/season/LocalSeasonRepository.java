package com.jeff.survivor.season;

import java.util.Set;
import java.util.TreeSet;

import org.springframework.stereotype.Repository;

import github.jschmidt10.survivor.api.Contestant;
import github.jschmidt10.survivor.api.Season;
import github.jschmidt10.survivor.api.repo.SeasonRepository;

/**
 * Season repo backed by in memory data structures.
 */
//@Repository
public class LocalSeasonRepository implements SeasonRepository {

	private Season season;
	
	public LocalSeasonRepository() {
		Set<Contestant> contestants = new TreeSet<>();
		
		contestants.add(new Contestant("Shirin", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_shirinoskooi.jpg"));
		contestants.add(new Contestant("Stephen", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_stephenfishbach.jpg"));
		contestants.add(new Contestant("Jeremy", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_jeremycollins.jpg"));
		contestants.add(new Contestant("Kass", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_kassmcquillen.jpg"));

		contestants.add(new Contestant("Tasha", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_tashafox.jpg"));
		contestants.add(new Contestant("Monica", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_monicapadilla.jpg"));
		contestants.add(new Contestant("Spencer", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_spencerbledsoe.jpg"));
		contestants.add(new Contestant("Abi-Maria", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_abi-mariagomes.jpg"));

		contestants.add(new Contestant("Savage", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_andrewsavage.jpg"));
		contestants.add(new Contestant("Kelley", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_kelleywentworth.jpg"));
		contestants.add(new Contestant("Jeff", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_jeffvarner.jpg"));
		contestants.add(new Contestant("Vytas", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_vytasbaskauskas.jpg"));

		contestants.add(new Contestant("Terry", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_terrydeitz.jpg"));
		contestants.add(new Contestant("Woo", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_woohwang.jpg"));
		contestants.add(new Contestant("Joe", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_joeanglim.jpg"));
		contestants.add(new Contestant("Ciera", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_cieraeastin.jpg"));

		contestants.add(new Contestant("Peih-Gee", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_peih-geelaw.jpg"));
		contestants.add(new Contestant("Wiglesworth", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_kellywiglesworth.jpg"));
		contestants.add(new Contestant("Kimmi", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_kimmikappenberg.jpg"));
		contestants.add(new Contestant("Keith", "http://wwwimage.cbsstatic.com/base/files/styles/102x128/public/cast/survivor31_cast_1080x810_keithnale.jpg"));

		season = new Season("Cambodia", true, contestants);
		
		season.eliminate("Vytas");
		season.eliminate("Shirin");
		season.eliminate("Kass");
		season.eliminate("Monica");
		season.eliminate("Jeff");
		season.eliminate("Terry");
		season.eliminate("Woo");
		season.eliminate("Peih-Gee");
	}

	@Override
	public boolean save(Season season) {
		this.season = season;
		return true;
	}

	@Override
	public Season getCurrent() {
		return season;
	}

	@Override
	public void close() {
		// TODO Auto-generated method stub
	}
}
