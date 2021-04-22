package clone

import (
  "climb/apps-deployer/utils"
  "github.com/go-git/go-git/v5"
  "github.com/go-git/go-git/v5/plumbing"
  "github.com/go-git/go-git/v5/plumbing/transport/http"
  "os"
)

func Clone(RepositoryURL, RepositoryRef, token, workdir string) (err error) {
  referenceName := plumbing.NewBranchReferenceName(RepositoryRef)

  _, err = git.PlainClone(workdir, false, &git.CloneOptions{
    URL:           RepositoryURL,
    SingleBranch:  true,
    ReferenceName: referenceName,
    Auth: &http.BasicAuth{
      Username: "oauth2",
      Password: token,
    },
    Progress: os.Stdout,
  })

  if err != nil {
    utils.LogError(err, "failed to clone repository")
  }

  return err
}
