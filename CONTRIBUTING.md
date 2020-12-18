# How to contribute to Underscore-contrib

## 1. Search the existing issues

Before you open a ticket or send a pull request, [search](https://github.com/documentcloud/underscore-contrib/issues) for previous discussions about the same feature or issue. Add to the earlier ticket if you find one.

## 2. Fork the project

Create your own fork of contrib where you can make your changes.

## 3. Install development dependencies

Make sure you have [Node.js][node] and [Yarn][yarn] installed. Then install contrib's development dependencies with `yarn`. Note that these dependencies include the [Grunt CLI][cli] which we use for task automation.

## 4. Change the code

Make your code changes, ensuring they adhere to the same [coding style as Underscore][style]. Do **not** edit the files in `dist/`.

Make any necessary updates to the qUnit tests found in `test/`. Run `yarn test` to catch any test failures or lint issues. You can also use `yarn grunt watch:test` to get instant feedback each time you save a file.

## 5. Update the docs

Make any necessary documentation updates in `docs/`. Do **not** edit `index.html` directly.

After updating the docs, run `yarn tocdoc` to rebuild the `index.html` file. Visually inspect `index.html` in your browser to ensure the generated docs look nice.

## 6. Send a pull request

Send a pull request to `documentcloud/underscore-contrib` for feedback.

If modifications are necessary, make the changes and rerun `yarn test` or `yarn tocdoc` as needed.

And hopefully your pull request will be merged by the core team! :-)

[style]:https://github.com/documentcloud/underscore/blob/master/underscore.js
[node]:http://nodejs.org/
[yarn]:https://classic.yarnpkg.com/
[cli]:http://gruntjs.com/getting-started#installing-the-cli
