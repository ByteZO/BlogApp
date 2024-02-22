import config from "../Conf/Config";
import { Client, Account, ID } from "appwrite";

export class Authentication {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.appWriteUrl).setProject(config.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) this.login;
      else userAccount;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logOut() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return this.account.getCurrentUser();
    } catch (error) {
      error;
    }
    return null;
  }
}

const authService = new Authentication();

export default authService;
