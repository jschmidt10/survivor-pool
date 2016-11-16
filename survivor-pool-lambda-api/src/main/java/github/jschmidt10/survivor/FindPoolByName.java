package github.jschmidt10.survivor;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.dynamo.DynamoPoolRepository;

import java.util.Collections;

/**
 * Finds a pool by its name.
 */
public class FindPoolByName implements LambdaLogging {

    /**
     * Handles an HTTP request for the service.
     *
     * @param context
     * @return REST response
     */
    public RestResponse handle(Request request, Context context) {
        LambdaLogger logger = context.getLogger();

        try {
            Iterable<Pool> pools = execute(request.getName());
            return RestResponse.success(pools);
        } catch (Exception e) {
            logException(logger, e);
            return RestResponse.failure(e.getMessage());
        }
    }

    /**
     * Executes a findByName lookup.
     *
     * @param name
     * @return pools that matched
     */
    public Iterable<Pool> execute(String name) {
        DynamoPoolRepository poolRepository = new DynamoPoolRepository(Configuration.POOL_TABLE);

        try {
            if (name == null || name.isEmpty()) {
                return poolRepository.getAll();
            } else {
                Pool pool = poolRepository.getByName(name);
                return pool == null ? Collections.emptyList() : Collections.singleton(pool);
            }
        } finally {
            poolRepository.close();
        }
    }

    /**
     * A FindPoolByName Request.
     */
    public static class Request {

        private String name;

        public Request() {
            this(null);
        }

        public Request(String name) {
            this.name = name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }
}
