# graceful-shutdown

## Example
We have a ecommerce with a lot of clients. It was developed by a group of devs that are every 2 days updating the software.

## Problem
We have some clients that are reporting errors when they are trying to finish theirs checkouts. We studied with devs and we saw that it have been happening every time that we have an update process.

## Graceful Shutdown
Graceful Shutdown is a strategy for only update the software when we don't any process running or any user accessing our application. This technic is used environments managed by containers like Kubernetes. Our application receives a message from our operating system informing that it needs to turn off. So, we can block new access, schedule connection with database or organize our software to turn off when any critical process were finished.
