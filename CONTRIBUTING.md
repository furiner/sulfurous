# Sulfurous Compendium of Contributions

You seem like a helpful person, and we appreciate that! We would like to thank you for your contributions to the Sulfurous project, and we would like to give you a special place to show off and guide you on how to contribute to the project.

### Table of Contents

* [Questions or Problems]()


## Questions or Problems
**Our issue tracker is reserved for issues correlating to Sulfurous as a framework, and feature additions to it.** If you have any deeper questions or problems with how to contribute, please ask in our [Discord server](); or if you have any questions about TypeScript, your best bet is to search on [Stack Overflow](https://stackoverflow.com/).

**Stack Overflow** is a place catered towards learning and asking questions about TypeScript, as well as programming in general.

All irrelevant questions that are for general support with contributing will be closed and redirected to the Discord server, or Stack Overflow.

## Issues and Bugs

If you find a bug in the source code of Sulfurous, or a critical security flaw; you can do us a solid by submitting an issue to our [issue tracker](https://github.com/irisu01/sulfurous/issues) on GitHub. If you know how to fix the problem yourself; you can submit a pull request with the fix.

### Feature Requests

You are able to request a new feature by submitting an issue to our [issue tracker](https://github.com/irisu01/sulfurous/issues) on GitHub. If the issue hasn't been suggested already, the proposal will be discussed in the issue; or in the relevant channel in the Discord server. If you wish to provide an implementation for the feature, you can submit a pull request with the feature in consideration of the feature's scope.

* If the feature is a **major addition**, then an issue will need to be outlined with the feature's scope and implementation in order to properly coordinate efforts and affairs with the feature, and prevent any wasted work. This will ensure that the feature is properly implemented and that it is in line with the project's goals and scope so that it can be fully implemented into Sulfurous. There are dedicated labels for these proposals, and we will assign them where best seen fit.
* Other **smaller additions** can very easily be made with a pull request.

## Contributions

Wanna become a contributor, or make sure you're following our constantly updating guidelines? This is the guide for you! All relative changes to the repository that aren't made in major addition by a core team member must be done by a pull request, and must be approved by a core team member before being merged into the repository. No single pull request can be merged without being thoroughly reviewed by a core team member, or a contributor with a high level of experience with the project. This is to ensure that the code is of a high quality, and that it is in line with the project's goals and scope.

### Becoming a Core Team Member

If you wish to become a core team member, you must be a contributor with a high level of experience with the project, and have a good understanding of the project's goals and scope. You must also be able to dedicate a good amount of time to the project, and be able to work with the other core team members to ensure that the project is moving forward in the right direction.

To support a request, all requests must be made in the Discord server, and must be approved by a majority of the core team members. If you are approved, you will be added to the core team, and will be able to merge pull requests and make relevant changes to the repository.


#### Expectations of Core Team Members

All core team members are expected to uphold the project's goals and scope, and to ensure that the project is moving forward in the right direction. It is a time heavy role, and requires a lot of dedication to the project. If you are unable to dedicate the time to the project, you will be removed from the core team.

### Submission Guidelines

#### Submitting an Issue

Before you submit an issue to our [issue tracker](https://github.com/irisu01/sulfurous/issues), please ensure that a relevant issue has not been submitted already. If you find a relevant issue, please comment on it with your findings, and we will try to get back to you as soon as possible; or the issue may contain a useful fix or workaround that you can use.

All issues that are submitted will be fixed as soon as possible, and will be prioritized based on their severity. If you wish to submit a pull request with a fix, you are more than welcome to do so. But in order for an issue to be fixed, it has to be reproducible and confirm that it's an issue to begin with. In order to reproduce bugs, we will ask you for a scenario that can reproduce the bugs, as well as information about your environment when necessary.

Information you may be expected to give includes: 
* the version of Sulfurous you are using,
* any other libraries that are being used with Sulfurous,
* the operating system you are using,
* the version of your browser (if relevant),
* and any other possible information that may be necessary.

If we cannot reproduce the issue, then we will have a hard time investigating and fixing it. If you are unable to provide us with this leisure, we will close your issue with the relevant "not reproducible" label.

All issues must be submitted using a relevant [issue template](https://github.com/irisu01/sulfurous/issues/new).

#### Submitting a Pull Request

All pull requests must be made against the `master` branch. Pull requests against other branches will be rejected. Before submitting a Pull Request, please ensure the following is up to spec:

* All code must be properly formatted, and must follow the project's style guide.
* All features must have a corresponding test case.
* That your code doesnt have a similar open or already closed pull request. If it does, please comment on the existing pull request; or leave it to the core team to decide whether or not to merge the pull request.

#### Style Guide

We have our own style guidelines that we follow and are procured by the core team. We use [ESLint](https://eslint.org/) to ensure that all code is properly formatted, and follows the project's style guide. If you are using an IDE, you can use the ESLint extension provided for it to ensure that your code is properly formatted. We will also have a CI system in place to ensure that all code is properly formatted, and follows the project's style guide.

#### Commit Message Guidelines

We haave lenient but active rules surrounding commits, and we expect all commits to follow these guidelines. If you are unable to follow these guidelines, we will ask you to ensure you do in the future. We will also be using commit messages to importantly *generate the change log for Sulfurous*.

##### **Commit Format**

Each commit must consist of a type, a scope and the subejct at hand. The scope is optional, and can be left out if it is not relevant to the commit. The type and subject must be separated by a colon, and the subject must be capitalized.

```
<type>(<scope>): <subject>
```

All commits should contain references to a relevant issue, if there is one. This can be done by adding a `#` followed by the issue number at the end of the commit message.

**Examples of good commit messages:**

```
fix(framework): fix a bug in the framework
build(npm): update dependencies
```

###### **Type**

The commit type can be one of the following:

* **build**: Changes that affect how Sulfurous is built, or how it is distributed, or other external dependency changes.
* **chore**: Changes to general tools or auxiliary tools and libraries such as documentation generation; or the publishing of Sulfurous.
* **ci**: Changes to the CI configuration files and scripts.
* **docs**: Changes to the documentation, or other document files.
* **feat**: A new feature.
* **fix**: A bug fix.
* **refactor**: Changes that neither fixes a bug or adds a feature, or other code changes that don't modify the functionality of Sulfurous; such as performance changes.
* **revert**: Changes that reverts a previous commit.
* **style**: Changes that do not affect the meaning of the code, such as formatting, whitespace, etc.
* **test**: Changes to test files such as adding or removing unit tests, or modifying test files.

###### **Scope**

The scope should have the relevant name of the asset being affected, such as:

* **meta**: The documents related to the project, such as the README, the LICENSE, etc.
* **common**: The common Sulfurous files, such as decorators, structures, interfaces, etc.
* **core**: The core Sulfurous files, such as the core framework, the core server, etc.
* **types**: The Sulfurous types folder, which contains individual types that are't explicitly objects (interfaces) or anything else.
* **sulfurous**: The main Sulfurous index files, such as index.ts.
* **npm**: The npm package.
* **docs**: The documentation.
* **config**: Any relevant configuration file to that specific type.
* **circleci**: The CircleCI configuration files and scripts.
* **github**: The GitHub configuration files and scripts.
* Any file is a valid scope, excluding its extension. Primarily, this should be used when editing framework classes.
* Additionally, you can create a new scope if it is not listed above; or utilize one based off the project structure.

If more than one thing is changed, then seperate it with a comma. (e.g. `docs, tests`)

If the scope is not relevant to the commit, then it can be left out.

###### **Subject**

The subject should be a short description of the change, and should be capitalized. It should not contain a period at the end. It should have no more than 50 characters, and not be capitalized.
