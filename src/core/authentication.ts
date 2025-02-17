class Authentication {
  getAccessToken() {
    return localStorage.getItem("token");
  }

  getUserData() {
    const s = localStorage.getItem("user");
    if (s) {
      return JSON.parse(s);
    } else {
      return {};
    }
  }

  isUserLoggedIn() {
    return !!this.getAccessToken();
  }

  async clear() {
    localStorage.clear();
  }

  loadState() {
    const accessToken = this.getAccessToken();
    return {
      isAuthenticated: !!accessToken,
      accessToken,
      user: this.getUserData(),
    };
  }
}

export default new Authentication();
