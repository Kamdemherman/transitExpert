import React, { useState, useEffect } from 'react';
import { Calendar, User, Eye, ArrowRight, Tag } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  tags: string[];
  published_at: string;
  views_count: number;
  reading_time: number;
}

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Sample blog posts for demonstration
  const samplePosts: BlogPost[] = [
    {
      id: 1,
      title: "Les nouvelles réglementations douanières 2024 : Ce que vous devez savoir",
      slug: "nouvelles-reglementations-douanieres-2024",
      excerpt: "Découvrez les principales modifications des réglementations douanières qui impactent vos expéditions internationales en 2024.",
      featured_image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      tags: ["Douanes", "Réglementation"],
      published_at: "2024-01-15T10:00:00Z",
      views_count: 1250,
      reading_time: 5
    },
    {
      id: 2,
      title: "Transport maritime vs aérien : Comment choisir le bon mode pour vos marchandises",
      slug: "transport-maritime-vs-aerien-guide-choix",
      excerpt: "Guide complet pour optimiser vos coûts et délais en choisissant le mode de transport le plus adapté à vos besoins.",
      featured_image: "https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      tags: ["Transport", "Maritime", "Aérien", "Optimisation"],
      published_at: "2024-01-10T14:30:00Z",
      views_count: 980,
      reading_time: 7
    },
    {
      id: 3,
      title: "Incoterms 2024 : Guide pratique pour les exportateurs",
      slug: "incoterms-2024-guide-exportateurs",
      excerpt: "Maîtrisez les Incoterms pour sécuriser vos transactions internationales et éviter les litiges commerciaux.",
      featured_image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      tags: ["Incoterms", "Export", "Commerce International"],
      published_at: "2024-01-05T09:15:00Z",
      views_count: 1450,
      reading_time: 6
    },
    {
      id: 4,
      title: "Digitalisation de la supply chain : Tendances et opportunités",
      slug: "digitalisation-supply-chain-tendances",
      excerpt: "Comment la transformation digitale révolutionne la logistique internationale et améliore l'efficacité opérationnelle.",
      featured_image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      tags: ["Digital", "Innovation", "Technologie"],
      published_at: "2023-12-28T16:45:00Z",
      views_count: 750,
      reading_time: 8
    },
    {
      id: 5,
      title: "Transport de marchandises dangereuses : Réglementation ADR/IMDG",
      slug: "transport-marchandises-dangereuses-adr-imdg",
      excerpt: "Tout ce qu'il faut savoir sur le transport sécurisé des matières dangereuses par route et mer.",
      featured_image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      tags: ["Sécurité", ],
      published_at: "2023-12-20T11:20:00Z",
      views_count: 620,
      reading_time: 4
    },
    {
      id: 6,
      title: "Brexit et commerce international : Impact sur vos expéditions UK",
      slug: "brexit-commerce-international-impact-uk",
      excerpt: "Analyse des nouvelles procédures douanières et formalités pour vos échanges avec le Royaume-Uni post-Brexit.",
      featured_image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      tags: [ "Douanes", ],
      published_at: "2023-12-15T13:10:00Z",
      views_count: 890,
      reading_time: 6
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des articles...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('blog.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('blog.description')}
          </p>
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedTag('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === '' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-blue-50'
            }`}
          >
            {t('blog.all')}
          </button>
          {allTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.reading_time} {t('blog.reading')}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={16} className="mr-2" />
                  <span>{formatDate(post.published_at)}</span>
                  <Eye size={16} className="ml-4 mr-2" />
                  <span>{post.views_count} {t('blog.views')}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium"
                    >
                      <Tag size={12} className="inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  {t('blog.read')}
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            {t('blog.newsletter.title')}
          </h3>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            {t('blog.newsletter.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('blog.newsletter.placeholder')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              {t('blog.newsletter.subscribe')}
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-3">
            {t('blog.newsletter.note')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;