package github.jschmidt10.survivor;

import com.amazonaws.services.lambda.runtime.LambdaLogger;

/**
 * Lambda based logging functions.
 */
public interface LambdaLogging {

    /**
     * Logs a stacktrace.
     *
     * @param logger
     * @param e
     */
    default void logException(LambdaLogger logger, Exception e) {
        logger.log("Error occurred: " + e.getMessage());

        StringBuilder sb = new StringBuilder();

        for (StackTraceElement element : e.getStackTrace()) {
            sb.append(element.toString() + "\n");
        }

        logger.log(sb.toString());
    }
}
