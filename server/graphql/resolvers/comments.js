const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');
const { UserInputError, AuthenticationError } = require('apollo-server-express');

module.exports = {
  Mutation: {
    
    //TODO: CREATE NEW COMMENT
    createComment: async (_, { postId, body }, context) => {
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError('Yorum boş geçilemez', { hatalar: { body: 'Yorum boş geçilemez' } });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.yorumlar.unshift({
          body,
          kullaniciAd: user.kullaniciAd,
          olusturulmaTarihi: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post Bulunamadı !');
      }
    },

    //TODO: DELETE USER COMMENT
    deleteComment: async (_, { postId, commentId }, context) => {
        const {kullaniciAd} = checkAuth(context);
        const post = await Post.findById(postId);
    
        if (post) {
          const commentIndex = post.yorumlar.findIndex(c => c.id == commentId);
    
          if (post.yorumlar[commentIndex].kullaniciAd === kullaniciAd) {
            post.yorumlar.splice(commentIndex, 1);
    
            await post.save();
            return post;
          } else {
            throw new AuthenticationError('Bu yorumu silmeye yetkiniz yok !');
          }
        } else {
          throw new UserInputError('Yorum bulunamadı !');
        }
      },
  },
};
