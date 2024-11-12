"use client";
import { useQuery } from "@apollo/client";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { GET_FEATURED_CROWDFUNDINGS } from "@/lib/graphql";
import { countBacker, Crowdfunding } from "@/types/Crowdfunding";
import { daysLeft } from "@/app/utils/date";
import Link from "next/link";

export default function FeaturedProjects() {
  const { loading, error, data } = useQuery(GET_FEATURED_CROWDFUNDINGS);
  if (loading) {
    return <h1>Loading . . .</h1>;
  }
  if (error) {
    console.error(error);
    return <h1>Error . . .</h1>;
  }

  const crowdfundings: Crowdfunding[] =
    data && data.crowdfundings ? data.crowdfundings : [];

  console.log(crowdfundings);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {crowdfundings.map((cf, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{cf.title}</CardTitle>
                <CardDescription>{cf.categories.join(",")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress
                  value={(cf.totalRaised / cf.target) * 100}
                  className="mb-2"
                />
                <p className="text-sm text-muted-foreground mb-4">
                  ${cf.totalRaised.toLocaleString()} raised of $
                  {cf.target.toLocaleString()} goal
                </p>
                <div className="flex justify-between text-sm">
                  <span>{countBacker(cf)} backers</span>
                  <span>{daysLeft(cf.deadline)} days left</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/project-detail/${cf.id}`}>
                  <Button className="w-full">Back this project</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
