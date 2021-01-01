#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import 'source-map-support/register';
import { CdkDeployStack, serviceName } from '../lib/cdk-deploy-stack';

const app = new App();
new CdkDeployStack(app, `${serviceName}CdkDeployStack`, {
  env: {
    account: process.env.AWS_ACCOUNT,
    region: 'ap-northeast-1'
  }
});
