import gitLabClient from "../api/gitlab-client";

class GitLabService {
  getRepositories() {
    return gitLabClient.post(
      "",
      `query Repositories($cursor: String) {  
        projects(membership: true, first: 100, after: $cursor, ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            nameWithNamespace
          }
        }
      }`
    );
  }

  getRepository() {
    return gitLabClient.post(
      "",
      `query Repository($cursor: String, $fullPath: ID!) {
        project(fullPath: $fullPath) {
          webUrl
          repository {
            empty
            rootRef
            branchNames(searchPattern: "*")
            tree(recursive: true) {
              trees(first: 100, after: $cursor) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  path
                }
              }
            }
          }
        }
      }`
    );
  }
}

export const gitHubService = new GitLabService();
