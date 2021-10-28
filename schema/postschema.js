const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;

const PostModel = require('../models/posts');


const postType = new GraphQLObjectType({
  name: 'post',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      title: {
        type: GraphQLString
      },
      content: {
        type: GraphQLString
      },
      author: {
        type: GraphQLString
      },
    }
  }})

  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        posts: {
          type: new GraphQLList(postType),
          resolve: function () {
            const posts = PostModel.find().exec()
            if (!posts) {
              throw new Error('Error')
            }
            return books
          }
        },
        posts: {
          type: postType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const postDetails = PostModel.findById(params.id).exec()
            if (!postDetails) {
              throw new Error('Error')
            }
            return postDetails
          }
        }
      }
    }
  });

  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addPost: {
          type: postType,
          args: {
            _id: {
              type: new GraphQLNonNull(GraphQLInt)
            },
            title: {
              type: new GraphQLNonNull(GraphQLString)
            },
            content: {
              type: new GraphQLNonNull(GraphQLString)
            },
            author: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const postModel = new PostModel(params);
            const newPost = postModel.save();
            if (!newPost) {
              throw new Error('Error');
            }
            return newPost
          }
        },

        updatePost: {
          type: postType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            title: {
              type: new GraphQLNonNull(GraphQLString)
            },
            content: {
              type: new GraphQLNonNull(GraphQLString)
            },
            author: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            return PostModel.findByIdAndUpdate(params.id, { title: params.title, content: params.content, author: params.author }, function (err) {
              if (err) return next(err);
            });
          }
        },

        deletePost: {
          type: postType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const delPost = PostModel.findByIdAndRemove(params.id).exec();
            if (!delPost) {
              throw new Error('Error')
            }
            return delPost;
          }
        }
      }
    }
  });

  
  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});