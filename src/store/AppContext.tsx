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
  title: 'The Digital Age of Free Expression',
  excerpt:
  'How the internet has transformed freedom of speech and the new challenges we face in the modern era.',
  content:
  'The internet has fundamentally democratized the way we share ideas. Never before in human history has an individual had the power to broadcast their thoughts to a global audience instantaneously. This unprecedented level of connectivity has given voice to the marginalized and sparked movements that have changed the world.\n\nHowever, this digital age of free expression is not without its complexities. The sheer volume of information makes it difficult to distinguish fact from fiction. Echo chambers can amplify extreme views, and the anonymity of the web sometimes emboldens harmful behavior. As we navigate this landscape, we must find a balance between protecting the fundamental right to speak and ensuring our digital spaces remain safe and constructive.\n\nUltimately, the future of free expression online depends on our collective commitment to digital literacy and responsible engagement. By fostering critical thinking and empathy, we can harness the power of the internet to build a more informed and connected global community.',
  author: 'Elena Rostova',
  authorId: 'user-1',
  date: '2023-10-15',
  category: 'Digital Rights',
  readTime: '4 min read',
  imageUrl: 'https://picsum.photos/seed/post1/800/400'
},
{
  id: '2',
  title: 'Building Inclusive Online Communities',
  excerpt:
  'Practical tips for creating welcoming digital spaces where diverse voices can thrive and collaborate.',
  content:
  "Creating an inclusive online community doesn't happen by accident; it requires intentional design and active cultivation. The foundation of any welcoming space is a clear set of community guidelines that explicitly value diversity and prohibit harassment. But rules alone are not enough. Community leaders must model the behavior they wish to see, demonstrating empathy, active listening, and respectful disagreement.\n\nOne effective strategy is to actively elevate marginalized voices. This can be done by inviting diverse guest contributors, highlighting different perspectives in discussions, and ensuring that moderation teams reflect the diversity of the community itself. When people see themselves represented and respected, they are more likely to engage meaningfully.\n\nFinally, inclusivity means being open to feedback and willing to evolve. Communities are living ecosystems. By regularly checking in with members and being transparent about moderation decisions, we build trust and ensure that our digital spaces remain safe and welcoming for everyone.",
  author: 'Marcus Chen',
  authorId: 'user-2',
  date: '2023-10-18',
  category: 'Community',
  readTime: '5 min read',
  imageUrl: 'https://picsum.photos/seed/post2/800/400'
},
{
  id: '3',
  title: 'AI Ethics: Balancing Innovation and Responsibility',
  excerpt:
  'Exploring the ethical considerations in AI development and how we can ensure technology serves humanity.',
  content:
  'Artificial Intelligence is advancing at a breakneck pace, promising to revolutionize everything from healthcare to transportation. But with this immense power comes profound responsibility. The ethical implications of AI are vast, encompassing issues of bias, privacy, accountability, and the future of work. If we are to harness AI for the greater good, we must prioritize ethical considerations at every stage of development.\n\nOne of the most pressing concerns is algorithmic bias. AI systems learn from data, and if that data reflects historical prejudices, the AI will inevitably replicate and even amplify them. Addressing this requires diverse development teams and rigorous testing to ensure fairness. Furthermore, as AI systems become more autonomous, determining accountability when things go wrong becomes increasingly complex.\n\nTo navigate these challenges, we need a collaborative approach involving technologists, ethicists, policymakers, and the public. By establishing clear ethical frameworks and prioritizing human well-being, we can ensure that AI remains a tool for empowerment rather than a source of harm.',
  author: 'Dr. Sarah Jenkins',
  authorId: 'user-3',
  date: '2023-10-22',
  category: 'AI Ethics',
  readTime: '6 min read',
  imageUrl: 'https://picsum.photos/seed/post3/800/400'
},
{
  id: '4',
  title: 'Digital Literacy in the Modern World',
  excerpt:
  "Why understanding technology and media is essential for participating fully in today's society.",
  content:
  "In today's hyper-connected world, digital literacy is no longer a luxury; it is a fundamental necessity. It goes beyond simply knowing how to use a smartphone or navigate a website. True digital literacy involves the ability to critically evaluate information, understand the mechanics of digital platforms, and protect one's privacy online. Without these skills, individuals are vulnerable to misinformation, manipulation, and digital exclusion.\n\nThe rapid spread of fake news and deepfakes highlights the urgent need for critical media consumption. We must teach people how to verify sources, recognize bias, and understand the algorithms that curate our digital feeds. Moreover, as more essential services move online, a lack of digital literacy can severely limit access to education, healthcare, and employment opportunities.\n\nPromoting digital literacy requires a concerted effort from educators, governments, and tech companies. By integrating digital skills into school curricula and providing accessible training for all ages, we can empower individuals to navigate the digital landscape safely and confidently.",
  author: 'David Alaba',
  authorId: 'user-4',
  date: '2023-10-25',
  category: 'Education',
  readTime: '4 min read',
  imageUrl: 'https://picsum.photos/seed/post4/800/400'
},
{
  id: '5',
  title: 'The Art of Respectful Disagreement Online',
  excerpt:
  'How to have productive debates and maintain civility in an increasingly polarized digital environment.',
  content:
  "The internet often feels like a battleground of polarized opinions, where nuanced debate is drowned out by outrage and name-calling. However, it is entirely possible to disagree respectfully online. The key is to approach conversations with a genuine desire to understand, rather than simply to win an argument. This means listening actively, acknowledging valid points, and avoiding personal attacks.\n\nOne effective technique is to separate the idea from the person. You can fiercely critique an argument without attacking the character of the individual making it. Additionally, it's important to recognize when a conversation is no longer productive. If an exchange devolves into insults or bad-faith arguments, it's often best to disengage and preserve your mental energy.\n\nUltimately, respectful disagreement is about recognizing our shared humanity. Behind every screen name is a real person with their own experiences and perspectives. By cultivating empathy and practicing digital etiquette, we can transform online spaces from arenas of conflict into forums for meaningful dialogue.",
  author: 'Maya Patel',
  authorId: 'user-5',
  date: '2023-10-28',
  category: 'Communication',
  readTime: '5 min read',
  imageUrl: 'https://picsum.photos/seed/post5/800/400'
},
{
  id: '6',
  title: 'Protecting Privacy While Staying Connected',
  excerpt:
  'Best practices for safeguarding your personal information in an era of constant digital surveillance.',
  content:
  "We live in an era where our personal data is a highly valuable commodity. Every click, search, and purchase leaves a digital footprint that is tracked, analyzed, and often sold. While staying connected is essential for modern life, it doesn't have to come at the cost of our privacy. By taking proactive steps, we can significantly reduce our digital exposure and protect our personal information.\n\nThe first line of defense is strong, unique passwords and two-factor authentication. These simple measures can prevent the vast majority of unauthorized access. Additionally, it's crucial to regularly review the privacy settings on your social media accounts and devices. Be mindful of the permissions you grant to apps, and consider using privacy-focused browsers and search engines that don't track your activity.\n\nUltimately, protecting your privacy requires an ongoing awareness of how your data is being used. By staying informed about digital rights and advocating for stronger privacy regulations, we can reclaim control over our personal information and navigate the digital world with confidence.",
  author: 'Alex Mercer',
  authorId: 'user-6',
  date: '2023-11-02',
  category: 'Privacy',
  readTime: '6 min read',
  imageUrl: 'https://picsum.photos/seed/post6/800/400'
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