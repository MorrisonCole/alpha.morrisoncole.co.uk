import { getOctokit, context } from "@actions/github";

const token = process.env["GITHUB_TOKEN"];
if (!token) {
  throw new Error("GITHUB_TOKEN is not set");
}
const octokit = getOctokit(token);
const { owner, repo } = context.repo;
const prNumber = process.env["PR_NUMBER"];
if (!prNumber) {
  throw new Error("PR_NUMBER is not set");
}
const environment = `pr-${prNumber}`;

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
  `Deactivated ${String(deployments.length)} deployment(s) for environment "${environment}"`,
);
