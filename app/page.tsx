import Intro from "@/components/Intro";
import NewsletterForm from "@/components/NewsletterForm";
import RecentPosts from "@/components/RecentPosts";
import RecentProjects from "@/components/RecentProjects";

export default function Home() {
  
  return (
    <section className="pb-24 pt-40">
      <div className="container max-w-3xl"> 
        <Intro />        

        <RecentPosts />
        <RecentProjects />

        <NewsletterForm />
      </div>
    </section>
  );
}
