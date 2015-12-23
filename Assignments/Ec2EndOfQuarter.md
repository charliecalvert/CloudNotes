# EC2 End of Quarter

This is a reminder that some of you may want to shut down your running instances on AWS.

If you are on the free tier, you will probably want to leave your instance running so you can show it to others. If you are running just one instance, and you are still on the free tier, then you will not be charged. The free tier subscription lasts for one year from the point at which you started it.

If your free tier subscription has expired, then you may want to shut down your instance. If you choose to shut it down, then you may still receive a small monthly bill for the hard drive space associated with your instance. If you terminate the instance, then it will be completely deleted and you will not be charged anything. If you choose to shut down or terminate your instance, you should also delete you elastic IP. You will be charged for an elastic IP if it is not associated with an instance. If you want to keep your instance running, then do not delete your elastic IP.

For those of you whose free tier has expired, but who want to keep your instance running, you can create a reserved instance. These instances are quite cheap. If you sign up for a 3 year subscription, they are about $5 a month for t2.micro instance, which is the kind we have been using. If you switch to a t2.nano instance, it is about $2.00 a month if you sign up for a 3 year subscription. To get a reserved instance, sign into AWS, go to the EC2 instance dashboard, and choose reserved instances from the menu on the left.

If you are unsure what or if you are being billed, sign into your AWS account. Click on your name at the upper right. Go to Billing and Cost management.

Let me know if you have questions.
