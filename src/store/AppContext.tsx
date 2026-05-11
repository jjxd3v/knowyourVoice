import React, { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
export interface User {
  id: string;
  name: string;
  email: string;
}
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
  pdfUrl?: string;
}
export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  date: string;
}
interface AppContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  articles: Article[];
  comments: Comment[];
}
const initialArticles: Article[] = [
{
  id: '1',
  title: 'Internet and Social Networks: Freedom of Expression in the Digital Age',
  excerpt:
  'A comprehensive analysis of how the internet has transformed freedom of speech, examining the balance between open expression and content moderation in social networks.',
  content:
  'This scholarly work examines the fundamental transformation of freedom of expression in the digital era. The internet and social networks have created unprecedented opportunities for individuals to share ideas globally, yet this democratization of speech presents complex challenges. The analysis explores how traditional concepts of free expression apply to digital platforms, the role of platform governance in moderating content, and the tension between protecting speech and preventing harm. Drawing from legal frameworks and case studies, this research provides insights into maintaining free expression rights while addressing misinformation, hate speech, and platform accountability in the modern digital landscape.',
  author: 'Internet Governance Research Team',
  authorId: 'user-1',
  date: '2024-01-15',
  category: 'Digital Rights',
  readTime: 'PDF Document',
  imageUrl: 'https://picsum.photos/seed/digirights1/800/400',
  pdfUrl: '/pdfs/Internet and social networks freedom of expression in the digital age.pdf'
},
{
  id: '2',
  title: 'Open For Debate: Governance, Power, and the Limits of Internet Openness',
  excerpt:
  'An in-depth examination of internet governance structures, power dynamics in digital spaces, and the boundaries of online openness in contemporary society.',
  content:
  'This research paper investigates the complex relationship between internet governance and power structures that shape digital openness. It analyzes how governance mechanisms affect access, participation, and expression online. The study examines various models of internet regulation, from centralized control to decentralized governance, and their implications for democratic participation. Through case studies of internet policy across different regions, the work highlights the challenges of maintaining an open internet while addressing legitimate concerns about security, privacy, and harmful content. The findings contribute to ongoing debates about who controls the internet and whose interests are served by current governance structures.',
  author: 'Global Digital Policy Institute',
  authorId: 'user-2',
  date: '2023-11-20',
  category: 'Digital Rights',
  readTime: 'PDF Document',
  imageUrl: 'https://picsum.photos/seed/digirights2/800/400',
  pdfUrl: '/pdfs/Open For Debate Governance, Power, and the Limits of Internet Openness.pdf'
},
{
  id: '3',
  title: 'AI-Based Removal of Hate Speech: Freedom of Expression Implications',
  excerpt:
  'Examining the opportunities and risks that AI-powered content moderation presents for freedom of expression on digital social networks.',
  content:
  'As social networks increasingly deploy artificial intelligence to detect and remove hate speech, critical questions emerge about the impact on freedom of expression. This research examines both the potential benefits and significant risks of AI-driven content moderation. The study analyzes how automated systems identify harmful content, the accuracy rates of such systems, and the phenomenon of over-blocking legitimate speech. It explores the balance between creating safer online environments and preserving open discourse, examining transparency requirements, appeal mechanisms, and human oversight needs. The work provides recommendations for developing AI moderation systems that effectively address hate speech while respecting fundamental rights to expression.',
  author: 'AI Ethics Research Consortium',
  authorId: 'user-3',
  date: '2024-02-10',
  category: 'AI Ethics',
  readTime: 'PDF Document',
  imageUrl: 'https://picsum.photos/seed/aiethics1/800/400',
  pdfUrl: '/pdfs/AI-based removal of hate speech from digital social networks chances and risks for freedom of expression.pdf'
},
{
  id: '4',
  title: 'Ethical Issues and Challenges in Social Media: A Current Scenario',
  excerpt:
  'A comprehensive overview of contemporary ethical dilemmas facing social media platforms, users, and society in the digital age.',
  content:
  'This systematic review addresses the multifaceted ethical challenges confronting social media ecosystems today. The research examines issues including algorithmic amplification of divisive content, data privacy concerns, platform accountability, digital addiction, and the spread of misinformation. Through analysis of current scenarios and case studies, the work identifies key ethical frameworks for evaluating social media practices. It explores the responsibilities of platforms, users, and regulators in creating ethical digital spaces. The findings highlight the urgent need for comprehensive ethical guidelines that balance innovation with human wellbeing, commercial interests with social good, and individual rights with collective safety in social media environments.',
  author: 'Social Media Ethics Research Center',
  authorId: 'user-4',
  date: '2023-12-05',
  category: 'AI Ethics',
  readTime: 'PDF Document',
  imageUrl: 'https://picsum.photos/seed/aiethics2/800/400',
  pdfUrl: '/pdfs/Ethical Issues and Challenges in Social Media A Current Scenario.pdf'
},
{
  id: '5',
  title: 'A Systematic Review on Digital Literacy',
  excerpt:
  'Comprehensive research examining the components, measurement, and development of digital literacy skills in contemporary society.',
  content:
  'Digital literacy has emerged as a critical competency for full participation in modern society. This systematic review synthesizes current research on digital literacy frameworks, examining the skills, knowledge, and attitudes that constitute digital competence. The analysis covers information literacy, media literacy, data literacy, and computational thinking as components of comprehensive digital literacy. It examines assessment methodologies and identifies gaps in current understanding. The work highlights the importance of digital literacy education across age groups and socioeconomic backgrounds, providing evidence-based recommendations for curriculum development and policy initiatives aimed at promoting widespread digital competence.',
  author: 'International Digital Literacy Association',
  authorId: 'user-5',
  date: '2024-01-08',
  category: 'Education',
  readTime: 'PDF Document',
  imageUrl: 'https://picsum.photos/seed/education1/800/400',
  pdfUrl: '/pdfs/A systematic review on digital literacy.pdf'
},
{
  id: '6',
  title: 'Key Factors in Digital Literacy in Learning and Education',
  excerpt:
  'A systematic literature review using text mining to identify critical success factors for digital literacy integration in educational settings.',
  content:
  'This research applies systematic literature review methodology combined with text mining techniques to identify key factors influencing digital literacy in learning and education contexts. The study analyzes a comprehensive corpus of academic literature to extract patterns and themes related to successful digital literacy education. Key factors examined include institutional support, teacher training, curriculum design, technological infrastructure, and student engagement strategies. The text mining analysis reveals emerging trends and research gaps in the field. The findings provide actionable insights for educators, administrators, and policymakers seeking to enhance digital literacy outcomes in educational institutions, emphasizing the interconnected nature of technological, pedagogical, and organizational factors.',
  author: 'Educational Technology Research Institute',
  authorId: 'user-6',
  date: '2023-09-25',
  category: 'Education',
  readTime: 'PDF Document',
  imageUrl: 'https://picsum.photos/seed/education2/800/400',
  pdfUrl: '/pdfs/Key factors in digital literacy in learning and education a systematic literature review using text mining.pdf'
},
{
  id: '7',
  title: 'Profiling Youth Risk Experiences for Targeted Online Safety Interventions',
  excerpt:
  'Research on understanding offline and online risk patterns among youth to develop effective, targeted interventions for online safety.',
  content:
  'This important study examines the relationship between offline vulnerabilities and online risk experiences among young people. Through comprehensive profiling of youth populations, the research identifies patterns that can predict online safety risks including cyberbullying, grooming, exposure to harmful content, and privacy violations. The work develops a framework for risk assessment that considers individual, family, and community factors. Most significantly, the research translates these insights into recommendations for targeted interventions that address specific risk profiles rather than applying one-size-fits-all approaches. The findings are essential for parents, educators, and child protection professionals seeking to implement evidence-based online safety strategies.',
  author: 'Youth Online Safety Research Network',
  authorId: 'user-7',
  date: '2023-10-12',
  category: 'Privacy',
  readTime: 'PDF Document',
  imageUrl: 'https://picsum.photos/seed/privacy1/800/400',
  pdfUrl: '/pdfs/Profiling the Offline and Online Risk Experiences of Youth to Develop Targeted Interventions for Online Safety.pdf'
},
{
  id: '8',
  title: 'Tackling Online Violence Against Children',
  excerpt:
  'Comprehensive strategies and interventions for preventing and responding to online violence targeting children in digital environments.',
  content:
  'Online violence against children represents one of the most serious challenges of the digital age. This research examines the various forms of online violence including sexual exploitation, cyberbullying, harassment, and exposure to traumatic content. The study analyzes the effectiveness of current prevention strategies, reporting mechanisms, and support services. It presents a multi-stakeholder approach involving technology companies, law enforcement, educators, parents, and children themselves. The work emphasizes the importance of age-appropriate digital safety education, robust content moderation, and victim support services. The findings provide a roadmap for coordinated action to protect children while preserving the educational and social benefits of digital participation.',
  author: 'Child Protection Digital Alliance',
  authorId: 'user-8',
  date: '2024-01-30',
  category: 'Privacy',
  readTime: 'PDF Document',
  imageUrl: 'https://picsum.photos/seed/privacy2/800/400',
  pdfUrl: '/pdfs/Tackling Online Violence Against Children.pdf'
},
{
  id: '9',
  title: 'Cyberbullying Prevention and Intervention Efforts: Current Knowledge and Future Directions',
  excerpt:
  'A comprehensive review of evidence-based approaches to preventing and intervening in cyberbullying within online communities.',
  content:
  'Cyberbullying remains a pervasive problem affecting online communities, particularly among young people. This research synthesizes current knowledge about effective prevention and intervention strategies. The study examines school-based programs, parental mediation approaches, peer support initiatives, and platform-level interventions. It analyzes the factors that make some approaches more successful than others, including duration, intensity, and comprehensive stakeholder involvement. The work identifies gaps in current research and practice, proposing future directions for more effective cyberbullying prevention. The findings emphasize the importance of combining technological solutions with social-emotional learning and community-wide awareness campaigns to create lasting change in online behavior norms.',
  author: 'Cyberbullying Research Center',
  authorId: 'user-9',
  date: '2023-08-18',
  category: 'Community',
  readTime: 'PDF Document',
  imageUrl: 'https://picsum.photos/seed/community1/800/400',
  pdfUrl: '/pdfs/espelage-hong-2016-cyberbullying-prevention-and-intervention-efforts-current-knowledge-and-future-directions.pdf'
}];

const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'default-user',
    name: 'You',
    email: 'user@opendiscourse.com'
  });
  const [articles] = useState<Article[]>(initialArticles);
  const [comments] = useState<Comment[]>([]);
  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);
  // Educational platform - no user posting functionality
  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        articles,
        comments
      }}>
      
      {children}
    </AppContext.Provider>);

};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};