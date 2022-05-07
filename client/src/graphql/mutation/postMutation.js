import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      kullaniciAd
      body
      olusturulmaTarihi
      begenenler {
        id
        olusturulmaTarihi
        kullaniciAd
      }
      yorumlar {
        id
        olusturulmaTarihi
        kullaniciAd
      }
      begeniSayisi
      yorumSayisi
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
