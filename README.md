# QA Automation & Performance Task

## Overview

This project contains a solution for a QA Automation and Performance task, including:

* UI test automation using Playwright
* Performance testing using k6

The focus was on delivering clean, maintainable test code and a structured approach to performance testing and analysis.

## Tech Stack

* Playwright (TypeScript) – UI automation
* k6 (JavaScript) – performance testing
* Node.js – project setup

## Project Structure

```
project/
├── tests/               # UI test cases
├── pages/               # Page Object Models
├── test-data/           # Test data
├── performance/         # k6 scripts and performance report
├── playwright.config.ts
├── package.json
└── README.md
```

## UI Automation

### Covered Scenarios

* Successful login with `standard_user`
* Failed login with `locked_out_user`
* Add product to cart
* Start checkout process

### Design Approach

* Lightweight Page Object Model for separation of concerns
* Small, focused test cases for readability and maintainability
* No hardcoded waits – relies on Playwright auto-waiting and assertions
* Reusable test data stored separately

### Running UI Tests

#### Install dependencies:

npm install

#### Run tests:

npx playwright test

#### Open HTML report:

npx playwright show-report

## Performance Testing

Performance tests are implemented using k6.

### Run the test:

k6 run performance/users-load.js

#### For detailed performance analysis and results, see:

performance/report.md

## Design Decisions

* Focused on required scenarios instead of broad coverage
* Prioritized readability and maintainability over framework complexity
* A lightweight login fixture is used for the standard user
* Selected k6 for simplicity and built-in performance metrics

## Trade-offs and Limitations

* Performance tests use a public demo API with enforced rate limits
* Results are indicative and influenced by environment constraints
* Limited scope due to expected task duration (3–4 hours)

## CI/CD Integration

UI tests can be integrated into CI pipelines (e.g., GitHub Actions):
* smoke tests on pull requests
* full regression on scheduled runs

Artifacts such as HTML reports and traces can be stored and shared.

## Failure Notifications

Test failures can be reported via:
* CI pipeline notifications
* Slack or Teams integrations
* links to reports and artifacts

## Quality Metrics

Suggested metrics:

* est pass rate
* flaky test rate
* execution duration trends
* API error rate and latency

## What to Automate

Automate:

* stable, repeatable, business-critical scenarios

Avoid:

* highly unstable UI flows
* low-value or one-off scenarios

## Performance vs Functional Testing

* Functional testing verifies correctness of behavior
* Performance testing evaluates system behavior under load (latency, throughput, stability)

## Final Note

This project prioritizes clarity, determinism, and practical test design within a limited time frame.