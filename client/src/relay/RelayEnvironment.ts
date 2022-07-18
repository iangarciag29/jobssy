import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import fetchGraphQL from "./fetchQuery";

/**
 * Make a request to the APIs GraphQL endpoint.
 * @param params Request parameters.
 * @param variables Request variables.
 */
async function fetchRelay(params: any, variables: any) {
    console.debug(`[DEBUG] [GRAPHQL] Fetching query ${params.name} with variables: ${JSON.stringify(variables)}`);
    return fetchGraphQL(params.text, variables);
}

/**
 * Creates a new relay environment.
 */
export default new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource()),
});