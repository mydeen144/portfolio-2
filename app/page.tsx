import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
// import BlogSection from './_components/BlogSection';
import Experiences from './_components/Experiences';
import InternalLinks from './_components/InternalLinks';
// import SiteMap from './_components/SiteMap';
import Skills from './_components/Skills';
import ProjectList from './_components/ProjectList';

export default function Home() {
    return (
        <div className="page-wrapper">
            <Banner />
            <AboutMe />
            <Skills />
            <Experiences />
            <ProjectList />
            {/* <InternalLinks /> */}
            {/* <BlogSection />
            <SiteMap /> */}
        </div>
    );
}
