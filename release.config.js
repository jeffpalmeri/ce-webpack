module.exports = {
  branches: ['master', { name: 'QA', prerelease: true }, { name: 'releaseprefixtest', prerelease: true }],
  dryRun: false,
  plugins: [
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm',
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
      },
    ],
  ],
};
