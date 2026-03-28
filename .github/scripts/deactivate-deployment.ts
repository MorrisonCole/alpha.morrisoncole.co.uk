import { getOctokit, context } from "@actions/github";

const octokit = getOctokit(process.env["GITHUB_TOKEN"]!);
const { owner, repo } = context.repo;
const environment = `pr-${process.env["PR_NUMBER"]}`;

const { data: deployments } = await octokit.rest.repos.listDeployments({
  owner,
  repo,
  environment,
});

for (const deployment of deployments) {
  await octokit.rest.repos.createDeploymentStatus({
    owner,
    repo,
    deployment_id: deployment.id,
    state: "inactive",
  });
}

console.log(
  `Deactivated ${deployments.length} deployment(s) for environment "${environment}"`,
);
