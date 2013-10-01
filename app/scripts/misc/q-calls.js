Q.fcall(getContributors(getRepoUrl()))
	.then(addContributors())
	.then(getCommitCount(getRepoUrl()))
	.then(getRepoInfo(getRepoUrl()))