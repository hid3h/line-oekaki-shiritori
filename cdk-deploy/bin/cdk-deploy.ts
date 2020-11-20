#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkDeployStack, serviceName } from '../lib/cdk-deploy-stack';

const app = new cdk.App();
new CdkDeployStack(app, `${serviceName}CdkDeployStack`, {
  env: {
    account: process.env.AWS_ACCOUNT,
    region: 'ap-northeast-1'
  }
});
