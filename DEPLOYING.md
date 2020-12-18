# How to cut a new release for Underscore-contrib

This is a checklist for repository maintainers. It covers all the steps involved in releasing a new version, including publishing to NPM and updating the `gh-pages` branch. We have tried to automate as many of these steps as possible using GitHub Actions. The workflows involved are in the (hidden) `.github` directory.

A "regular" release includes new changes that were introduced to the `master` branch since the previous release. A *hotfix* release instead skips any such changes and only addresses urgent problems with the previous release.


## Steps

1. Ensure your local `master` branch descends from the previous release branch and that it is in a state that you want to release. **Exception:** for hotfixes, ensure you have an up-to-date local copy of the previous release branch instead.
2. Decide on the next version number, respecting [semver][semver]. For the sake of example we'll use `1.2.3` as a placeholder version throughout this checklist.
3. Create a `release/1.2.3` branch based on `master`. **Exception:** if this is a hotfix, start from the previous release branch instead and call it `hotfix/1.2.3`.
4. Bump the version number in the `package.json` and the `yarn.lock` by running the command `yarn version --no-git-tag-version`, with the extra flag `--major`, `--minor` or `--patch` depending on which part of the version number you're incrementing (e.g., `--patch` if you're bumping from 1.2.2 to 1.2.3). Note that you can configure `yarn` to always include the `--no-git-tag-version` flag so you don't have to type it every time.
5. Bump the version number in the source code and in `docs/index.md` accordingly.
6. Commit the changes from steps 4 and 5 with a commit message of the format `Bump the version to 1.2.3`.
7. Add more commits to extend the change log and to update any other documentation that might require it. Ensure that all documentation looks good.
8. Push the release branch and create a pull request against `master` (also if it is a hotfix).
9. At your option, have the release branch reviewed and add more commits to satisfy any change requests.
10. The "Continuous Integration" workflow will trigger automatically on the pull request. This runs the test suite against multiple environments. Wait for all checks to complete.
11. If any checks fail, add more commits to fix and repeat from step 10.
12. When all reviewers are satisfied and all checks pass, apply the "ready to launch" label to the pull request. This will trigger the "Prepublication staging" workflow, which will merge the release branch into the `prepublish` branch. Merge manually if the workflow fails for whatever reason. **Note:** do *not* merge into `master` yet.
13. The merging of new changes into `prepublish` will trigger the "Continuous Deployment" workflow, which is documented below. **Pay attention as the deployment workflow progresses.**
14. If the deployment workflow fails, identify the failing step and address as quickly as possible. Possible solution steps include:
    - Adding new commits to the release branch and repeating from step 12 (most likely if the docs fail to build for some reason).
    - Manually pushing new commits to the `prepublish` branch and repeating from step 13 (this might be needed in case of merge conflicts, although this is highly unlikely).
    - Manually running `yarn publish` (if something is wrong with the NPM registry or the authentication credentials).
    - Manually merging `prepublish` into `gh-pages` (in unlikely case of merge conflicts).
    - Manually tagging the release on `gh-pages`.
15. When the deployment workflow has completed, double-check that the new version was published to NPM, that the website was updated and that the repository contains a tag for the new release.
16. Finally merge the release branch into `master`, but keep the branch around for a few days in case you need to do a hotfix.
17. Delete the release branch. You can still restore it if necessary, by tracing the history graph two commits back from the release tag.


## Automated continuous deployment workflow

This workflow is defined in `.github/workflows/cd.yml`. Note that roughly the first half of the steps in that file consists of basic boilerplate to check out the source and install dependencies.

The publishing to NPM depends on a [secret][secrets] named `NPM_TOKEN`, representing the API token of the NPM account that owns the `underscore-contrib` package. Only admins of the documentcloud organization can access this setting.

1. Checkout the source, restore caches and install the dependencies.
2. Run `yarn grunt dist docco tocdoc`.
3. Commit the output of the previous step to the `prepublish` branch.
4. Publish to NPM.
5. Merge the `prepublish` branch into `gh-pages`.
6. Tag the tip of `gh-pages` with the version number in the `package.json`.


[semver]: https://semver.org
[secrets]: https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets
