const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

import { typeDefs } from "./index";
import { resolvers } from "./index";
const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
        typeDefs,
    ]),
    resolvers: mergeResolvers([
        resolvers,
    ])
})
export default schema