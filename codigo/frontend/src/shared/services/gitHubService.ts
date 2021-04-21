import gitHubClient from "../api/github-client";

class GitHubService {
  getRepositories() {
    return gitHubClient.post(
      "",
      `query Repositories($cursor: String) {
      viewer {
        repositories(first: 100, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            nameWithOwner
          }
        }
      }
    }`
    );
  }
}

export const gitHubService = new GitHubService();
