import { gql } from "@apollo/client";
import axios from "axios";
import { print } from "graphql";
import { settings } from "../config";

export const getBlogs = async () => {
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
          allblogs(input: {}) {
            id
            blogTitle
            blogContent
            blogTags
          }
        }
      `),
      variables: {},
    },
  });
  return response.data;
};

export const getMyBlogs = async () => {
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
          blogs {
            id
            blogTitle
            blogContent
            blogTags
          }
        }
      `),
      variables: {},
    },
  });
  return response.data;
};

export const deleteBlog = async (id) => {
  const token = sessionStorage["token"];
  const response = await axios({
    method: "POST",
    url: settings.server,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: print(gql`
        mutation ($id: String!) {
          deleteBlog(id: $id)
        }
      `),
      variables: {
        id: id,
      },
    },
  });
  return response.data;
};

export const createOrUpdateBlog = async (
  
  blogTitle: string,
  blogContent: string,
  blogTags: string,
  id?: string
) => {
  console.log(blogTitle)
  const token = sessionStorage["token"];
  console.log(token)
  if (id===undefined){
    id=""
  }
  const response = await axios({
    method: "POST",
    url: settings.server,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: print(gql`
        mutation (
          $id:String!,
          $blogTitle: String!,
          $blogContent: String!,
          $blogTags: String!
          
        ) {
          createOrUpdateBlog(
            input: {
              id:$id
              blogTitle: $blogTitle
              blogContent: $blogContent
              blogTags: $blogTags
            }
          ) {
            id
            blogTitle
            blogContent
            blogTags
          }
        }
      `),
      variables: {
        id:id,
        blogTitle: blogTitle,
        blogContent: blogContent,
        blogTags: blogTags,
      
      },
    },
  });
  console.log(response.data)
  return response.data;
};

export const blogById = async (id) => {
  console.log(id)
  const token = sessionStorage["token"];
  const response = await axios({
    method: "POST",
    url: settings.server,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: print(gql`
        query ($id: String!) {
          getBlogById(id: $id) {
            blogTitle
            blogContent
            blogTags
          }
        }
      `),
      variables: {
        id: id,
      },
    },
  });
  return response.data;
};
