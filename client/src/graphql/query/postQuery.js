import { gql } from "@apollo/client";

export const GET_DATA_QUERY = gql`
  {
      getPosts {
        id
        kullaniciAd
        body
        begeniSayisi
        yorumSayisi
      }
  }
`;