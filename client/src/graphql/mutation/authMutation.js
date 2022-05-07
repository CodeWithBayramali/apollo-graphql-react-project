import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation register($kullaniciAd: String!, $parola: String!, $parolaKontrol: String!, $email: String!) {
    register(
      registerInput: { kullaniciAd: $kullaniciAd, parola: $parola, parolaKontrol: $parolaKontrol, email: $email }
    ) {
      id
      kullaniciAd
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($kullaniciAd: String!, $parola: String!) {
    login(kullaniciAd: $kullaniciAd, parola: $parola) {
      id
      kullaniciAd
      token
    }
  }
`;
