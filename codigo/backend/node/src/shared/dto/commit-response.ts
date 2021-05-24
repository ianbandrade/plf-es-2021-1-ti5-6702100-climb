class CommitStats {
  additions: number;
  deletions: number;
  total: number;
}

export class GitlabCommit {
  id: string;
  short_id: string;
  created_at: string;
  parent_ids: string[];
  title: string;
  message: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committer_name: string;
  committer_email: string;
  committed_date: string;
  web_url: string;
  stats: CommitStats;
  status: boolean;
  project_id: number;
  last_pipeline: null;
}

class GithubCommitFile {
  filename: string;
  additions: number;
  deletions: number;
  changes: number;
  status: string;
  raw_url: string;
  blob_url: string;
  patch: string;
}

class GithubCommitParents {
  url: string;
  sha: string;
}

class GithubCommitCommiter {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: false;
}

class GithubCommitAuthor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: false;
}

class GithubCommitVerification {
  verified: false;
  reason: string;
  signature: null;
  payload: null;
}

class GithubCommitDetail {
  url: string;
  author: GithubCommitAuthor;
  committer: GithubCommitCommiter;
  message: string;
  tree: GithubCommitParents;
  comment_count: number;
  verification: GithubCommitVerification;
}

export class GithubCommit {
  url: string;
  sha: string;
  node_id: string;
  html_url: string;
  comments_url: string;
  commit: GithubCommitDetail;
  author: GithubCommitAuthor;
  committer: GithubCommitCommiter;
  parents: GithubCommitParents[];
  stats: CommitStats;
  files: GithubCommitFile[];
}
