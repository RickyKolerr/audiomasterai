import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Globe, Users, Award, Building, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobListing {
  title: string;
  location: string;
  responsibilities: string;
  requirements: string;
  icon: React.ElementType;
}

const jobListings: JobListing[] = [
  {
    title: "AI Engineer (Natural Language Processing)",
    location: "Remote / In-office",
    responsibilities: "Enhance the performance of our AI models (GPT-4 integration), work on custom voice synthesis algorithms, and improve content processing capabilities.",
    requirements: "Strong experience in NLP, AI model training, and large-scale data processing.",
    icon: Rocket,
  },
  {
    title: "Frontend Developer (UI/UX)",
    location: "Remote / In-office",
    responsibilities: "Work closely with the design team to develop user-friendly interfaces, implement new features, and optimize user experience.",
    requirements: "Proficiency in React, HTML, CSS, and a strong portfolio of UI/UX projects.",
    icon: Users,
  },
  {
    title: "Marketing Manager",
    location: "Remote",
    responsibilities: "Develop and execute marketing strategies to drive platform adoption, manage partnerships, and enhance brand visibility.",
    requirements: "Experience in digital marketing, content creation, and user growth strategies.",
    icon: Globe,
  },
  {
    title: "Backend Developer",
    location: "Remote / In-office",
    responsibilities: "Build and optimize the backend infrastructure, integrate third-party APIs, and manage cloud infrastructure.",
    requirements: "Strong experience in Node.js, cloud technologies (AWS, Google Cloud), and database management.",
    icon: Building,
  },
  {
    title: "Customer Support Specialist",
    location: "Remote",
    responsibilities: "Provide exceptional customer service, troubleshoot issues, and help users make the most of the platform.",
    requirements: "Excellent communication skills, empathy, and a problem-solving mindset.",
    icon: Award,
  },
];

const benefits = [
  "Competitive Salary & Benefits",
  "Flexible Working Hours & Remote Options",
  "Innovative Projects that push the boundaries of AI and technology",
  "Learning Opportunities to grow your skills",
  "A Collaborative Team working towards a common mission",
];

const Careers = () => {
  const { toast } = useToast();

  const handleApply = (jobTitle: string) => {
    toast({
      title: "Application Started",
      description: `You're applying for ${jobTitle}. This feature will be available soon.`,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
          Join Our
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {" "}Team
          </span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in [--delay-1]">
          At Kolerr Technologies Inc, we're constantly looking for talented and passionate individuals 
          to help us revolutionize the audiobook industry.
        </p>
      </section>

      {/* Culture Section */}
      <section className="container mx-auto px-4 py-16 bg-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
          <p className="text-muted-foreground mb-8">
            We foster an inclusive, collaborative, and creative environment where innovation thrives. 
            Our team is made up of individuals who are not only experts in their fields but are also 
            motivated by the mission to change the way people experience books.
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobListings.map((job, index) => (
            <Card key={job.title} className="animate-fade-in" style={{ 
              animationDelay: `${index * 100}ms` 
            }}>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <job.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {job.location}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Responsibilities:</h4>
                  <p className="text-sm text-muted-foreground">{job.responsibilities}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <p className="text-sm text-muted-foreground">{job.requirements}</p>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => handleApply(job.title)}
                >
                  <Briefcase className="mr-2" />
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16 bg-accent/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work with Us?</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit}
                className="p-4 rounded-lg bg-background shadow-sm animate-fade-in flex items-center gap-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Award className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Careers;