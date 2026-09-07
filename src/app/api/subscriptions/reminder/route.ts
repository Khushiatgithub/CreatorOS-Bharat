import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionModel } from '@/lib/db-models';
import { sendMembershipRenewalEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subscriptionId, subscriberEmail, subscriberName, planName, amount, billingCycle, renewalDate } = body;

    let targetEmail = subscriberEmail;
    let targetName = subscriberName || 'Member';
    let targetPlan = planName || 'Creator VIP Membership';
    let targetAmount = amount || 799;
    let targetCycle: 'monthly' | 'yearly' = billingCycle || 'monthly';
    let targetRenewalDate = renewalDate || new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    if (subscriptionId) {
      try {
        const sub = await SubscriptionModel.getById(subscriptionId);
        if (sub) {
          targetEmail = targetEmail || sub.userEmail;
          targetName = targetName || sub.userName;
          targetPlan = targetPlan || sub.planName;
          targetAmount = targetAmount || sub.amount;
          targetCycle = (sub.billingCycle as 'monthly' | 'yearly') || 'monthly';
          targetRenewalDate = sub.currentPeriodEnd || targetRenewalDate;
        }
      } catch (dbErr) {
        console.warn('Subscription lookup warning for reminder:', dbErr);
      }
    }

    if (!targetEmail) {
      return NextResponse.json(
        { success: false, error: 'Subscriber email or valid subscriptionId is required.' },
        { status: 400 }
      );
    }

    const emailResult = await sendMembershipRenewalEmail(targetEmail, {
      subscriberName: targetName,
      subscriberEmail: targetEmail,
      planName: targetPlan,
      amount: targetAmount,
      billingCycle: targetCycle,
      renewalDate: targetRenewalDate,
      subscriptionId
    });

    return NextResponse.json({
      success: true,
      message: `Membership renewal reminder sent to ${targetEmail}`,
      emailResult
    });
  } catch (error: any) {
    console.error('Error in subscription reminder route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send renewal reminder' },
      { status: 500 }
    );
  }
}
