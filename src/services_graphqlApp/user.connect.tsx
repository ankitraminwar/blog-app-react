import { gql } from "@apollo/client";
import axios from "axios";
import { print } from "graphql";
import { settings } from "../config";

export const signin = async (email, password) => {
  //console.log(email,password)
  const response = await axios({
    method: "POST",
    url: settings.server,
    data: {
      query: print(gql`
        query ($email: String!, $password: String!) {
          signin(input: { email: $email, password: $password }) {
            token
          }
        }
      `),
      variables: {
        email: email,
        password: password,
      },
    },
  });
  //console.log(response.data.signin.token)
  return response;
};

export const signup = async (email, firstName, lastName, password) => {
  const response = await axios({
    method: "POST",
    url: settings.server,
    data: {
      query: print(gql`
        mutation (
          $email: String!
          $firstName: String!
          $lastName: String!
          $password: String!
        ) {
          signup(
            input: {
              email: $email
              firstName: $firstName
              lastName: $lastName
              password: $password
            }
          ) {
            id
            email
          }
        }
      `),
      variables: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      },
    },
  });
  return response.data;
};

export const profileDel = async () => {
  const token = sessionStorage["token"];
  const response = await axios({
    method: "POST",
    url: settings.server,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: print(gql`
        query {
          profile {
            email
            firstName
            lastName
          }
        }
      `),
      variables: {

      },
    },
  });

  return response.data;
};

export const profileUpdate = async (email: string, firstName: string, lastName: string) => {
  const token = sessionStorage["token"];
  const response = await axios({
    method: "POST",
    url: settings.server,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: print(gql`
        mutation ($email:String!, $firstName:String!, $lastName:String!) {
          updateProfile(input:{email: $email, firstName: $firstName, lastName: $lastName}) {
            email
            firstName
            lastName
          }
        }
      `),
      variables: {
        email: email,
        firstName: firstName,
        lastName: lastName,
      },
    },
  });

  return response.data;
};