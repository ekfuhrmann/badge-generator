# About
This repository is meant to serve as a default starting point for new projects.

# To Use
Open up the command line and type these commands:</li>
```git
$ git clone --bare https://github.com/ekfuhrmann/repo_setup.git
# Make a bare clone of this repository
```
```git
$ cd repo_setup.git
$ git push --mirror https://github.com/exampleuser/new-repository.git
# Mirror-push to the new repository
```
```git
$ cd ..
$ rm -Recurse -Force repo_setup.git
# Remove our temporary local repository
```

Read more <a href="https://help.github.com/articles/duplicating-a-repository/">here</a>.

# Important
Be sure to run `npm install` on the new repository once it has been mirrored to.
