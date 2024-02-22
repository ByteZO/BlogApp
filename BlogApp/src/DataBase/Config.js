import config from "../Conf/Config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Services {
  client = new Client();
  Databases;
  Bucket;
  constructor() {
    this.client.setEndpoint(config.appWriteUrl).setProject(config.projectId);
    this.Databases = new Databases(this.client);
    this.Bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.Databases.createDocument(
        config.dataBaseId,
        config.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.Databases.getDocument(
        config.dataBaseId,
        config.collectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.Databases.updateDocument(
        config.dataBaseId,
        config.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.Databases.deleteDocument(
        config.dataBaseId,
        config.collectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAllPost(querys = [Query.equal("status", "active")]) {
    try {
      return await this.Databases.listDocuments(
        config.dataBaseId,
        config.collectionId,
        querys
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.Bucket.createFile(config.bucketId, ID.unique(), file);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileID) {
    try {
      return await this.Bucket.deleteFile(config.bucketId, fileID);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileID) {
    return this.Bucket.getFilePreview(config.bucketId, fileID);
  }
}
