import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import FeaturedProjects from "@/components/home/featured-project";

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
          Empower Change, One Donation at a Time!
        </h1>
        <p className="text-xl mb-8">
          Join us in making a difference and supporting the causes that matter
          most to you.
        </p>
        <div className="flex justify-center space-x-4">
          {/* <Button size="lg">Start a Project</Button> */}
          <Link href="/projects">
            <Button size="lg" variant="secondary">
              Explore Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const categories = [
    "Pendidikan",
    "Kesehatan",
    "Kemanusiaan",
    "Infrastruktur",
    "Sosial",
    "Anak-anak",
    "Keagamaan",
    "Bencana Alam",
    "Ekonomi",
    "Pemberdayaan Masyarakat",
    "Lansia",
    "Lingkungan",
    "Disabilitas",
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
      title: "From Dream to Reality: Sarah's Journey!",
      description:
        "With your generous donations, Sarah was able to fund her education and pursue her dream of becoming a doctor, inspiring her community along the way.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Building a Brighter Future for Our Youth!",
      description:
        "Thanks to your support, the local youth center now provides essential resources and mentorship programs, transforming lives and fostering hope for a better tomorrow.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "A Second Chance: Mark's New Beginning!",
      description:
        "Through the kindness of our donors, Mark received the medical treatment he desperately needed, allowing him to reclaim his life and give back to those in need.",
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
