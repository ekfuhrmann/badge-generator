## About
This repository is a boilerplate for new PUG projects.

## To Use With New Repo
Open up the command line and type these commands:</li>
```command
$ git clone https://github.com/ekfuhrmann/repo_setup.git
# Make a clone of this repository
```
```command
$ cd repo_setup
$ remove-item .git/ -Recurse -Force
# Delete the git directory
```
```command
$ git init
# Re-init repository content into the new project
```


## To Use With Existing Commits
Open up the command line and type these commands:</li>
```command
$ git clone --bare https://github.com/ekfuhrmann/repo_setup.git
# Make a bare clone of this repository
```
```command
$ cd repo_setup
$ git push --mirror https://github.com/exampleuser/<new-repository>.git
# Mirror-push to the new repository
```
```command
$ cd ..
$ rm -Recurse -Force repo_setup
# Remove our temporary local repository
```

Read more <a href="https://help.github.com/articles/duplicating-a-repository/">here</a>.

## Important
Be sure to run `npm install` on the new repository once it has been mirrored to.
