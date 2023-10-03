import {
  SchedulerClient,
  CreateScheduleCommand,
  ListSchedulesCommand,
} from "@aws-sdk/client-scheduler";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

const defaultTimezone = 'Asia/Singapore';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(defaultTimezone);

const {ANNOUNCEMENT_LAMBDA_ARN, ANNOUNCEMENT_ROLE_ARN}= process.env;

import {v4}  from 'uuid';

export default class Scheduler {
  client = null;

  constructor() {
    this.client = new SchedulerClient({
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });
  }

  async create({Name, ScheduleExpression, Now = true}) {

    if (Now) {
        return;
    }

    const params = {
        Name,
        ScheduleExpression,
        ScheduleExpressionTimezone: defaultTimezone,
        FlexibleTimeWindow: {
            Mode: 'OFF'
        },
        // StartDate: dayjs.tz().utc(),
        // EndDate: dayjs.tz().add(2, 'days').utc(),
        Target: {
            RoleArn: ANNOUNCEMENT_ROLE_ARN,
            Arn: ANNOUNCEMENT_LAMBDA_ARN, //LAMBDA_FUNCTION_ARN
            Id: v4(),
            Input: JSON.stringify({hello: 123})
          },
      };

      if (Now) {
        //
      } else {
        params.ScheduleExpression = `at(${dayjs.tz().add(1,'minute').format('YYYY-MM-DDTHH:mm:00')})`
        console.log(params.ScheduleExpression)
      }
      console.log(params)
      await this.client.send(new CreateScheduleCommand(params));

      const lambdaParams = { // eslint-disable-line
        Rule: Name,
        Targets: [
          {
            Arn: ANNOUNCEMENT_LAMBDA_ARN, //LAMBDA_FUNCTION_ARN
            Id: v4(),
            Input: JSON.stringify({hello: 123})
          },
        ],
      };

      //await this.client.send(new PutTargetsCommand(lambdaParams));

  }

  async listAll() {
    const result = await this.client.send(new ListSchedulesCommand({}));
    const target = await this.client.send(new TargetSummary(result.Schedules[0].Target.Arn));// eslint-disable-line
    return result;
  }
}
