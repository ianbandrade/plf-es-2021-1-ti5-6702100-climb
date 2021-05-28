export class GithubWebhookEventDto {
  ref: string;
  head_commit: CommitData;
}

export class GitlabWebhookEventDto {
  ref: string;
  commits: CommitData[];
}

class CommitData {
  id: string;
}
