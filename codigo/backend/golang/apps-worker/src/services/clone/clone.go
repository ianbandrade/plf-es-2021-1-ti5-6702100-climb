package clone

import (
	"climb/apps-worker/utils"
	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
	"github.com/go-git/go-git/v5/plumbing/transport/http"
	"os"
)

func Clone(RepositoryURL, RepositoryRef, token, commit, workdir string) (err error) {
	referenceName := plumbing.NewBranchReferenceName(RepositoryRef)

	repository, err := git.PlainClone(workdir, false, &git.CloneOptions{
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
		return
	}

	worktree, err := repository.Worktree()

	if err != nil {
		utils.LogError(err, "failed to get repository worktree")
		return
	}

	if err = worktree.Checkout(&git.CheckoutOptions{
		Hash: plumbing.NewHash(commit),
	}); err != nil {
		utils.LogError(err, "failed to run commit checkout")
		return
	}

	return err
}
