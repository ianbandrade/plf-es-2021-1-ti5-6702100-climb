import { githubClient } from "../api/github-client";
import {
  GithubAvatarResponse,
  GithubRepositoriesGraphQLResponse,
  GithubRepositoryGraphQLResponse,
} from "../interfaces/graphql-repositories";
import {
  BasicRepository,
  RepositoriesList,
  Repository,
} from "../interfaces/Repository";
import { ropsitoriesNamesToList } from "../utils/reposities-names-to-list";

class GithubService {
  public async getRepositories(): Promise<RepositoriesList> {
    return ropsitoriesNamesToList(await this.fetchRepositories());
  }

  private async fetchRepositories(
    repositories: BasicRepository[] = [],
    cursor?: string
  ): Promise<BasicRepository[]> {
    const response = await githubClient.post<GithubRepositoriesGraphQLResponse>(
      "",
      {
        query: `query Repositories($cursor: String) {
          viewer {
            repositories(first: 100, after: $cursor) {
              pageInfo {
                hasNextPage
                endCursor
            }
            nodes {
                nameWithOwner
                isEmpty
            }
        }
      }
    }`,
        variables: { cursor },
        operationName: "Repositories",
      }
    );

    const {
      hasNextPage,
      endCursor,
    } = response.data.data.viewer.repositories.pageInfo;
    const pageRepositories = response.data.data.viewer.repositories.nodes.map<BasicRepository>(
      ({ nameWithOwner, isEmpty }) => ({ name: nameWithOwner, isEmpty })
    );

    if (!hasNextPage) {
      return [...repositories, ...pageRepositories];
    }

    return [
      ...pageRepositories,
      ...(await this.fetchRepositories(repositories, endCursor)),
    ];
  }

  async getRepository(
    owner: string,
    name: string,
    branchs: string[] = [],
    cursor?: string
  ): Promise<Repository> {
    const { data } = await githubClient.post<GithubRepositoryGraphQLResponse>(
      "",
      {
        query: `query Repository($cursor: String, $owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          id
          url
          defaultBranchRef {
            name
          }
          refs(refPrefix: "refs/heads/", first: 1, after: $cursor) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              name
            }
          }
        }
      }`,
        variables: { cursor, owner, name },
        operationName: "Repository",
      }
    );

    const { refs, defaultBranchRef, url, id } = data.data.repository;
    branchs.push(...refs.nodes.map<string>(({ name }) => name));
    if (refs.pageInfo.hasNextPage) {
      return this.getRepository(owner, name, branchs, refs.pageInfo.endCursor);
    }

    return {
      branchs,
      defaultBranch: defaultBranchRef.name,
      name,
      repositoryId: id,
      url,
    };
  }

  async getUserAvatar(): Promise<string> {
    const { data: res } = await githubClient.post<GithubAvatarResponse>("", {
      query: `query GetAvatarUrl {
          viewer {
            avatarUrl
          }
        }`,
      operationName: "GetAvatarUrl",
    });

    return res.data.viewer.avatarUrl;
  }
}

export const githubService = new GithubService();
