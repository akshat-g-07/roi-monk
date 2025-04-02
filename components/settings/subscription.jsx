"use client";

import { GetSubscriptionDate } from "@/actions/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServerAction } from "@/hooks/useServerAction";

export default function Subscription() {
  const { data } = useServerAction(GetSubscriptionDate);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <p>You are subscribed upto: {data}</p>
      </CardContent>
    </Card>
  );
}
