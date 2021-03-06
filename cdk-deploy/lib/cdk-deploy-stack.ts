import { Construct, Duration, Stack, StackProps } from '@aws-cdk/core';
import * as cf from '@aws-cdk/aws-cloudfront'
import * as s3 from '@aws-cdk/aws-s3'
import * as s3deploy from '@aws-cdk/aws-s3-deployment'
import { PriceClass } from '@aws-cdk/aws-cloudfront';

export const serviceName = 'oekaki2'

export class CdkDeployStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
    });

    const distribution = new cf.CloudFrontWebDistribution(this, 'MyDistribution', {
      priceClass: PriceClass.PRICE_CLASS_200,
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: websiteBucket
          },
          behaviors : [
            {
              minTtl: Duration.seconds(0),
              maxTtl: Duration.seconds(0),
              defaultTtl: Duration.seconds(0),
              isDefaultBehavior: true
            }
          ]
        },
      ],
      defaultRootObject: "index.html",
      comment: `${serviceName}本番`
    });

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('../frontend/build')],
      destinationBucket: websiteBucket,
      distribution
    });
  }
}
