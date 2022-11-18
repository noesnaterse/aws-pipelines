import {Construct} from "constructs";
import {CfnBudget} from "@aws-cdk/aws-budgets";
import { Stack, StackProps } from 'aws-cdk-lib';

interface BudgetProps {
    budgetAmount: number,
    emailAddress: string,
}

export class Budget extends Construct {
    constructor(scope: Construct, id: string, props: BudgetProps) {
        super(scope, id);

        new CfnBudget(this, 'Budget', {
            budget: {
                budgetLimit: {
                    amount: props.budgetAmount,
                    unit: 'USD'
                },
                budgetName: 'Monthly budget',
                budgetType: 'COSTS',
                timeUnit: 'MONTHLY',
            },
            notificationsWithSubscribers: [
                {
                    notification: {
                        threshold: 100,
                        notificationType: 'ACTUAL',
                        comparisonOperator: 'GREATER_THAN',
                        thresholdType: 'PERCENTAGE',
                    },
                    subscribers: [
                        {
                            subscriptionType: 'EMAIL',
                            address: props.emailAddress,
                        }
                    ]

                }
            ]
        })
    }
}