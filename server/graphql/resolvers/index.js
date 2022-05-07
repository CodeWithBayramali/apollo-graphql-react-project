const postResolvers= require('./posts');
const userResolvers=require('./users');
const commentResolvers=require('./comments')

module.exports = {

    Post:{
        begeniSayisi(parent){
            return parent.begenenler.length
        },
        yorumSayisi:(parent)=> parent.yorumlar.length
    },

    Query:{
        ...postResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    Subscription:{
        ...postResolvers.Subscription
    }
}