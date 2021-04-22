import { gitlabClient } from "../api/gitlab-client";
import {
  GitlabRepositoriesGraphQLResponse,
  GitlabRepositoryGraphQLResponse,
} from "../interfaces/graphql-repositories";
import {
  BasicRepository,
  RepositoriesList,
  Repository,
} from "../interfaces/Repository";
import { ropsitoriesNamesToList } from "../utils/reposities-names-to-list";

class GitlabService {
  public async getRepositories(): Promise<RepositoriesList> {
    return ropsitoriesNamesToList(await this.fetchRepositories());
  }

  private async fetchRepositories(
    repositories: BasicRepository[] = [],
    cursor?: string
  ): Promise<BasicRepository[]> {
    const response = await gitlabClient.post<GitlabRepositoriesGraphQLResponse>(
      "",
      {
        query: `query Repositories($cursor: String) {
          projects(membership: true, first: 100, after: $cursor) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              name
              namespace {
                fullPath
              }
              repository {
                empty
              }
            }
          }
        }`,
        variables: { cursor },
        operationName: "Repositories",
      }
    );

    const { hasNextPage, endCursor } = response.data.data.projects.pageInfo;
    const pageRepositories: BasicRepository[] = response.data.data.projects.nodes.map(
      ({ name, namespace, repository }) => ({
        name: `${namespace.fullPath}/${name}`,
        isEmpty: repository.empty,
      })
    );

    if (!hasNextPage) {
      return [...repositories, ...pageRepositories];
    }

    return [
      ...pageRepositories,
      ...(await this.fetchRepositories(repositories, endCursor)),
    ];
  }

  async getRepository(owner: string, name: string): Promise<Repository> {
    const { data } = await gitlabClient.post<GitlabRepositoryGraphQLResponse>(
      "",
      {
        query: `query Repository($cursor: String, $fullPath: ID!) {
          project(fullPath: $fullPath) {
            id
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
        }`,
        variables: { cursor: undefined, fullPath: `${owner}/${name}` },
        operationName: "Repository",
      }
    );

    const { repository, webUrl, id } = data.data.project;

    return {
      branchs: repository.branchNames,
      defaultBranch: repository.rootRef,
      name,
      repositoryId: id,
      url: webUrl,
    };
  }
}

export const gitlabService = new GitlabService();
