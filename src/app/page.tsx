import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default async function CrowdfundingPlatform() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <FeaturedProjects />
        <Categories />
        <SuccessStories />
      </main>

      <footer className="bg-muted mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/help"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-primary"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-4">
                Stay updated with our latest projects and success stories.
              </p>
              <form className="flex">
                <Input type="email" placeholder="Your email" className="mr-2" />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; 2024 CrowdFund. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Fund Your Passion, Change the World
        </h1>
        <p className="text-xl mb-8">
          Join our community of creators and backers to bring innovative ideas
          to life.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg">Start a Project</Button>
          <Button size="lg" variant="secondary">
            Explore Projects
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const projects = [
    {
      title: "Eco-Friendly Water Bottle",
      category: "Environment",
      goal: 10000,
      raised: 7500,
      backers: 150,
      daysLeft: 12,
    },
    {
      title: "Innovative Learning App",
      category: "Education",
      goal: 25000,
      raised: 18000,
      backers: 320,
      daysLeft: 8,
    },
    {
      title: "Community Garden Initiative",
      category: "Community",
      goal: 5000,
      raised: 4200,
      backers: 85,
      daysLeft: 5,
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress
                  value={(project.raised / project.goal) * 100}
                  className="mb-2"
                />
                <p className="text-sm text-muted-foreground mb-4">
                  ${project.raised.toLocaleString()} raised of $
                  {project.goal.toLocaleString()} goal
                </p>
                <div className="flex justify-between text-sm">
                  <span>{project.backers} backers</span>
                  <span>{project.daysLeft} days left</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Back this project</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const categories = [
    "Technology",
    "Art",
    "Film",
    "Music",
    "Games",
    "Publishing",
    "Food",
    "Fashion",
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Explore Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Button key={index} variant="outline" className="h-24 text-lg">
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuccessStories() {
  const stories = [
    {
      title: "Clean Ocean Project",
      description: "Raised $1M to clean plastic from the ocean",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Innovative Smartwatch",
      description: "Reached 500% of funding goal in 2 weeks",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Indie Film Production",
      description: "Successfully funded and premiered at Sundance",
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-16 h-16 rounded-full"
                  />
                  <CardTitle>{story.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>{story.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
