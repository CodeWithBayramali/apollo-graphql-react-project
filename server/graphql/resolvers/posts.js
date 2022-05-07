const { UserInputError } = require('apollo-server-express');
const Post = require('../../models/Post');
const authControl = require('../../utils/checkAuth');

module.exports = {
  Query: {
    //TODO: GET ALL POST
    async getPosts() {
      try {
        const posts = await Post.find().sort({ olusturulmaTarihi: -1 });
        return posts;
      } catch (error) {
        throw new Error();
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post Bulunamadı !');
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    //TODO: CREATE NEW POST
    async createPost(_, { body }, context) {
      const user = authControl(context);
      const addPost = new Post({
        body,
        user: user.id,
        kullaniciAd: user.kullaniciAd,
        olusturulmaTarihi: new Date().toISOString(),
      });
      const post = await addPost.save();
      context.pubsub.publish('NEW_POST', { newPost: post });
      return post;
    },

    //TODO: DELETE POST BY ID
    async deletePost(_, { postId }, context) {
      try {
        const user = authControl(context);
        if (user) {
          const post = await Post.findById(postId);
          if (user.kullaniciAd === post.kullaniciAd) {
            await post.delete();
            return 'Post Silindi';
          } else {
            throw new Error('Post bulunamadı !');
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    //TODO: LIKE POST POSTID AND USERNAME
    async likePost(_, { postId }, context) {
      const { kullaniciAd } = authControl(context);

      const post = await Post.findById(postId);

      if (post) {
        if (post.begenenler.find(b => b.kullaniciAd === kullaniciAd)) {
          post.begenenler = post.begenenler.filter(b => b.kullaniciAd !== kullaniciAd);
        } else {
          post.begenenler.push({
            kullaniciAd,
            olusturulmaTarihi: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post Bulunamadı !');
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST'),
    },
  },
};
