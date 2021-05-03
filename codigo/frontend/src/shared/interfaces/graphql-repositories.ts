export interface GithubRepositoriesGraphQLResponse {
  data: {
    viewer: {
      repositories: {
        pageInfo: {
          hasNextPage: boolean;
          endCursor: string;
        };
        nodes: {
          nameWithOwner: string;
          isEmpty: boolean;
        }[];
      };
    };
  };
}

export interface GitlabRepositoriesGraphQLResponse {
  data: {
    projects: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
      nodes: {
        name: string;
        namespace: {
          fullPath: string;
        };
        repository: {
          empty: boolean;
        };
      }[];
    };
  };
}

export interface GithubRepositoryGraphQLResponse {
  data: {
    repository: {
      id: string;
      url: string;
      defaultBranchRef: {
        name: string;
      };
      refs: {
        pageInfo: {
          hasNextPage: boolean;
          endCursor: string;
        };
        nodes: [
          {
            name: string;
          }
        ];
      };
    };
  };
}

export interface GithubAvatarResponse {
  data: {
    viewer: {
      avatarUrl: string;
    };
  };
}

export interface GitlabRepositoryGraphQLResponse {
  data: {
    project: {
      id: string;
      webUrl: string;
      repository: {
        empty: boolean;
        rootRef: string;
        branchNames: string[];
        tree: {
          trees: {
            pageInfo: {
              hasNextPage: boolean;
              endCursor: string;
            };
            nodes: any[];
          };
        };
      };
    };
  };
}
