package github.jschmidt10.survivor;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.api.Season;
import github.jschmidt10.survivor.api.repo.SeasonRepository;
import github.jschmidt10.survivor.dynamo.DynamoPoolRepository;
import github.jschmidt10.survivor.dynamo.DynamoSeasonRepository;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/**
 * Creates a new surivor pool.
 */
public class CreatePool implements LambdaLogging {

    /**
     * Handles an HTTP request for the service.
     *
     * @param context
     * @return REST response
     */
    public RestResponse handle(Pool pool, Context context) {
        LambdaLogger logger = context.getLogger();

        try {
            boolean result = execute(pool);
            return result ? RestResponse.success("Pool created.") : RestResponse.failure("Could not execute pool.");
        } catch (Exception e) {
            logException(logger, e);
            return RestResponse.failure(e.getMessage());
        }
    }

    /**
     * Creates a new pool.
     *
     * @param pool
     * @return true if the pool was created successfully, false, otherwise
     * @throws Exception
     */
    public boolean execute(Pool pool) throws Exception {
        DynamoPoolRepository poolRepository = new DynamoPoolRepository(Configuration.POOL_TABLE);
        SeasonRepository seasonRepository = new DynamoSeasonRepository(Configuration.SEASON_TABLE);

        try {
            Season season = seasonRepository.getCurrent();

            PoolValidation.validate(pool, season);

            String url = URLEncoder.encode(pool.getName(), StandardCharsets.UTF_8.toString());
            pool.setUrl(url);

            return poolRepository.save(pool);
        } finally {
            poolRepository.close();
            seasonRepository.close();
        }
    }
}
