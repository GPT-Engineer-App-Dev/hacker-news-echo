import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StoryCard from './StoryCard';
import StoryCardSkeleton from './StoryCardSkeleton';

import { useSearchParams } from 'react-router-dom';

const fetchTopStories = async (searchTerm = '') => {
  const url = searchTerm
    ? `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(searchTerm)}&hitsPerPage=100`
    : 'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const HackerNewsList = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';

  const { data, isLoading, error } = useQuery({
    queryKey: ['topStories', searchTerm],
    queryFn: () => fetchTopStories(searchTerm),
  });

  if (error) return <div className="text-red-500 text-center">Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading
        ? Array(9).fill().map((_, index) => <StoryCardSkeleton key={index} />)
        : data?.hits.map((story) => <StoryCard key={story.objectID} story={story} />)
      }
    </div>
  );
};

export default HackerNewsList;