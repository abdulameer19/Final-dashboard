"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const index_1 = require("./index");
const index_2 = require("./index");
const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
        index_1.typeDefs,
    ]),
    resolvers: mergeResolvers([
        index_2.resolvers,
    ])
});
exports.default = schema;
