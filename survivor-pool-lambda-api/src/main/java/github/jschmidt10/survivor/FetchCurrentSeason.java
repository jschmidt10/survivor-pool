package github.jschmidt10.survivor;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import github.jschmidt10.survivor.api.Season;
import github.jschmidt10.survivor.dynamo.DynamoSeasonRepository;

/**
 * Gets the current season.
 */
public class FetchCurrentSeason implements LambdaLogging {

    /**
     * Handles an HTTP request for the service.
     *
     * @param context
     * @return REST response
     */
    public RestResponse handle(Context context) {
        LambdaLogger logger = context.getLogger();

        try {
            return RestResponse.success(execute());
        } catch (Exception e) {
            logException(logger, e);
            return RestResponse.failure(e.getMessage());
        }
    }

    /**
     * Executes a fetchCurrentSeason lookup.
     *
     * @return current season
     */
    public Season execute() {
        DynamoSeasonRepository seasonRepository = new DynamoSeasonRepository(Configuration.SEASON_TABLE);

        try {
            return seasonRepository.getCurrent();
        } finally {
            seasonRepository.close();
        }
    }
}
