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

  getRepository() {
    return gitHubClient.post(
      "",
      `query Repository($cursor: String, $owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        url
        isEmpty
        defaultBranchRef {
          name
        }
        refs(refPrefix: "refs/heads/", first: 100, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            name
          }
        }
      }
    }`
    );
  }
}

export const gitHubService = new GitHubService();
